import { execSync } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';

const FRONTMATTER_EXCLUDED_FILES = new Set(['index.md', '404.md', 'tags.md', 'playground.md']);

/**
 * stage 올라와 있는 파일 중에서
 * md 파일( src/ 밑 )만 뽑아낸다.
 * - A: Added
 * - C: Copied
 * - M: Modified
 * - R: Renamed
 * - T: Type changed
 * 필요하면 D 빼고 거의 다 넣는 식으로 가는 게 안전함
 */
function getStagedMdFiles() {
  try {
    // --cached : index(=stage)에 있는 거 기준
    // --diff-filter=ACMRT : 새로 만든/수정한/이동한 거 다 포함
    const output = execSync('git diff --cached --name-status --diff-filter=ACMRT', {
      encoding: 'utf-8'
    }).trim();

    if (!output) return [];

    return output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const parts = line.split('\t');
        const status = parts[0];
        const shortStatus = status[0];

        // rename의 경우: R100\told\tnew
        const filePath = status.startsWith('R') ? (parts[2] ?? parts[1]) : parts[1];

        return {
          status: shortStatus,
          filePath
        };
      })
      .filter(({ filePath }) => filePath && filePath.endsWith('.md') && filePath.startsWith('src/'))
      .filter(({ filePath }) => {
        const fileName = filePath.split('/').pop();
        return fileName ? !FRONTMATTER_EXCLUDED_FILES.has(fileName) : false;
      });
  } catch (error) {
    // git diff 가 실패해도 pre-commit을 막고 싶지 않으면 빈 배열
    return [];
  }
}

/**
 * md 파일의 frontmatter 중 created/updated를 관리한다
 */
function updateFrontmatterDates({ filePath, status }) {
  if (!fs.existsSync(filePath)) {
    console.warn(`파일이 존재하지 않음: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const today = new Date().toISOString().split('T')[0];
  let changed = false;

  // 새로 추가된 파일(A/C)인데 created가 없다면 오늘 날짜로 채운다
  if ((status === 'A' || status === 'C') && (!data.created || String(data.created).trim() === '')) {
    data.created = today;
    changed = true;
  }

  // updated가 없으면 추가하고, 기존 값이 오늘이 아니면 오늘 날짜로 갱신
  const updatedMissing =
    typeof data.updated !== 'string' || data.updated.trim() === '' || data.updated !== today;
  if (updatedMissing) {
    data.updated = today;
    changed = true;
  }

  if (changed) {
    const newContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(filePath, newContent, 'utf-8');

    // Git stage에 다시 추가
    execSync(`git add "${filePath}"`);

    const createdInfo = data.created ? `, created: ${data.created}` : '';
    console.log(`✓ ${filePath} - updated: ${data.updated}${createdInfo}`);
    return true;
  }

  return false;
}

// 메인 실행
function main() {
  const stagedFiles = getStagedMdFiles();

  if (stagedFiles.length === 0) {
    process.exit(0);
  }

  console.log('📅 수정된 파일의 frontmatter 날짜 갱신 중...\n');

  let updatedCount = 0;
  for (const fileInfo of stagedFiles) {
    if (updateFrontmatterDates(fileInfo)) {
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    console.log(`\n✅ ${updatedCount}개 파일의 날짜 정보가 갱신되었습니다.`);
  } else {
    console.log('\n✓ 모든 파일의 created/updated 날짜가 최신 상태입니다.');
  }

  process.exit(0);
}

main();

