import { execSync } from 'child_process';
import fs from 'fs';
import matter from 'gray-matter';

// Git staged 파일 중 수정된 md 파일 가져오기
function getStagedMdFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=M', {
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
    return [];
  }
}

// updated 날짜 갱신
function updateModifiedDate(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`파일이 존재하지 않음: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const today = new Date().toISOString().split('T')[0];

  // updated 날짜가 오늘과 다르면 갱신
  if (data.updated === '' || data.updated !== today) {
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
}

main();

