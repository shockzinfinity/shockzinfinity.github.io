import { execSync } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';

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
    const output = execSync('git diff --cached --name-only --diff-filter=ACMRT', {
      encoding: 'utf-8'
    }).trim();

    if (!output) return [];

    return output
      .split('\n')
      .filter(file => file.endsWith('.md') && file.startsWith('src/'))
      .filter(file => {
        const fileName = file.split('/').pop();
        return !['index.md', '404.md', 'tags.md', 'playground.md'].includes(fileName);
      });
  } catch (error) {
    // git diff 가 실패해도 pre-commit을 막고 싶지 않으면 빈 배열
    return [];
  }
}

/**
 * md 파일의 frontmatter 중 updated를 오늘 날짜로 맞춤
 */
function updateModifiedDate(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`파일이 존재하지 않음: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const today = new Date().toISOString().split('T')[0];

  const needUpdate =
    typeof data.updated !== 'string' ||
    data.updated.trim() === '' ||
    data.updated !== today;

  // updated 날짜가 오늘과 다르면 갱신
  if (needUpdate) {
    data.updated = today;
    const newContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(filePath, newContent, 'utf-8');

    // Git stage에 다시 추가
    execSync(`git add "${filePath}"`);

    console.log(`✓ ${filePath} - updated: ${today}`);
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

  console.log('📅 수정된 파일의 updated 날짜 갱신 중...\n');

  let updatedCount = 0;
  for (const file of stagedFiles) {
    if (updateModifiedDate(file)) {
      updatedCount++;
    }
  }

  if (updatedCount > 0) {
    console.log(`\n✅ ${updatedCount}개 파일의 updated 날짜가 갱신되었습니다.`);
  } else {
    console.log('\n✓ 모든 파일의 updated 날짜가 최신 상태입니다.');
  }

  process.exit(0);
}

main();

