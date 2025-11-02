import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const FRONTMATTER_EXCLUDED_FILES = new Set(['index.md', '404.md', 'tags.md', 'playground.md']);
const FRONTMATTER_EXCLUDED_DIRS = new Set(['node_modules', '.vitepress', 'public', 'excludes']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');

function shouldSkipByFileName(filePath) {
  const fileName = path.basename(filePath);
  return FRONTMATTER_EXCLUDED_FILES.has(fileName);
}

// Git에서 파일의 생성 날짜와 수정 날짜 가져오기
function getGitDates(filePath) {
  try {
    // 상대 경로로 변환 (Git은 저장소 루트 기준 상대 경로 필요)
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

    // 파일의 최초 커밋 날짜 (생성 날짜)
    const createdCmd = `git log --follow --format=%aI --diff-filter=A -- "${relativePath}"`;
    let createdDate = execSync(createdCmd, { encoding: 'utf-8' }).trim().split('\n')[0];

    // 최초 커밋을 찾지 못한 경우, 전체 히스토리에서 가장 오래된 것 찾기
    if (!createdDate) {
      const allCommitsCmd = `git log --follow --format=%aI --reverse -- "${relativePath}"`;
      createdDate = execSync(allCommitsCmd, { encoding: 'utf-8' }).trim().split('\n')[0];
    }

    // 파일의 마지막 커밋 날짜 (수정 날짜)
    const updatedCmd = `git log -1 --format=%aI -- "${relativePath}"`;
    const updatedDate = execSync(updatedCmd, { encoding: 'utf-8' }).trim();

    console.log(`  Git: ${relativePath}`);
    console.log(`    created: ${createdDate ? createdDate.split('T')[0] : 'N/A'}`);
    console.log(`    updated: ${updatedDate ? updatedDate.split('T')[0] : 'N/A'}`);

    if (!createdDate || !updatedDate) {
      throw new Error('Git 날짜를 찾을 수 없음');
    }

    return {
      created: createdDate.split('T')[0],
      updated: updatedDate.split('T')[0]
    };
  } catch (error) {
    // Git 히스토리가 없는 경우 파일 시스템 날짜 사용
    console.warn(`  ⚠️  Git 히스토리를 찾을 수 없음: ${filePath}`);
    console.warn(`     파일 시스템 날짜 사용 (정확하지 않을 수 있음)`);
    const stats = fs.statSync(filePath);
    const date = stats.birthtime.toISOString().split('T')[0];
    return {
      created: date,
      updated: stats.mtime.toISOString().split('T')[0]
    };
  }
}

// 모든 md 파일 찾기
function findMdFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!FRONTMATTER_EXCLUDED_DIRS.has(item)) {
        files.push(...findMdFiles(fullPath));
      }
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Frontmatter 업데이트
function updateFrontmatter(filePath) {
  if (shouldSkipByFileName(filePath)) {
    console.log(`❌ 건너뜀: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  console.log(`\n📄 처리 중: ${filePath}`);
  const dates = getGitDates(filePath);

  // created/updated가 비어있을 때만 채우고, 기존 값과 다르면 갱신
  const needCreatedUpdate =
    typeof data.created !== 'string' || data.created.trim() === '' || data.created !== dates.created;
  const needUpdatedUpdate =
    typeof data.updated !== 'string' || data.updated.trim() === '' || data.updated !== dates.updated;

  if (needCreatedUpdate) {
    data.created = dates.created;
  }

  if (needUpdatedUpdate) {
    data.updated = dates.updated;
  }

  if (!needCreatedUpdate && !needUpdatedUpdate) {
    console.log(`   → 변경 없음 (created: ${data.created}, updated: ${data.updated})`);
    return;
  }

  const newContent = matter.stringify(markdownContent, data);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✅ 업데이트 완료`);
  console.log(`   → created: ${data.created}`);
  console.log(`   → updated: ${data.updated}`);
}

// 메인 실행
function main() {
  console.log('📅 Frontmatter 날짜 업데이트 시작...\n');

  const mdFiles = findMdFiles(srcDir);
  console.log(`총 ${mdFiles.length}개의 마크다운 파일 발견\n`);

  for (const file of mdFiles) {
    updateFrontmatter(file);
  }

  console.log('\n✅ 완료!');
}

main();
