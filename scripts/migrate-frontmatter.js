import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, '../src');
const backupDir = path.resolve(__dirname, '../.backup-frontmatter');

// Git에서 파일의 생성 날짜와 수정 날짜 가져오기
function getGitDates(filePath) {
  try {
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

    // 파일의 최초 커밋 날짜 (생성 날짜)
    const createdCmd = `git log --follow --format=%aI --diff-filter=A -- "${relativePath}"`;
    let createdDate = execSync(createdCmd, { encoding: 'utf-8' }).trim().split('\n')[0];

    if (!createdDate) {
      const allCommitsCmd = `git log --follow --format=%aI --reverse -- "${relativePath}"`;
      createdDate = execSync(allCommitsCmd, { encoding: 'utf-8' }).trim().split('\n')[0];
    }

    // 파일의 마지막 커밋 날짜 (수정 날짜)
    const updatedCmd = `git log -1 --format=%aI -- "${relativePath}"`;
    const updatedDate = execSync(updatedCmd, { encoding: 'utf-8' }).trim();

    if (!createdDate || !updatedDate) {
      console.warn(`  ⚠️  Git 히스토리를 찾을 수 없음: ${filePath}`);
      const stats = fs.statSync(filePath);
      const date = stats.birthtime.toISOString().split('T')[0];
      return {
        created: date,
        updated: stats.mtime.toISOString().split('T')[0]
      };
    }

    return {
      created: createdDate.split('T')[0],
      updated: updatedDate.split('T')[0]
    };
  } catch (error) {
    console.warn(`  ⚠️  날짜 가져오기 실패: ${filePath}`);
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
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...findMdFiles(fullPath));
    } else if (stats.isFile() && item.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// 파일 백업
function backupFile(filePath) {
  const relativePath = path.relative(srcDir, filePath);
  const backupPath = path.join(backupDir, relativePath);
  const backupDirPath = path.dirname(backupPath);

  if (!fs.existsSync(backupDirPath)) {
    fs.mkdirSync(backupDirPath, { recursive: true });
  }

  fs.copyFileSync(filePath, backupPath);
}

// description 추출 (meta 배열에서)
function extractDescription(meta) {
  if (!Array.isArray(meta)) return null;

  const descItem = meta.find(item => item.name === 'description');
  return descItem?.content || null;
}

// VitePress 표준 frontmatter로 변환
function migrateFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  // 특수 페이지는 제외
  const fileName = path.basename(filePath);
  if (['index.md', '404.md', 'tags.md', 'playground.md'].includes(fileName)) {
    console.log(`⏭️  건너뜀 (특수 페이지): ${filePath}`);
    return false;
  }

  // 이미 마이그레이션된 파일인지 확인
  const hasLegacyFields = data.lang || data.meta || data.feed || data.sidebar;
  const hasModernFields = data.created && data.updated;

  if (!hasLegacyFields && hasModernFields) {
    console.log(`✅ 이미 최신 형식: ${filePath}`);
    return false;
  }

  console.log(`\n📄 처리 중: ${filePath}`);

  // 백업 생성
  backupFile(filePath);

  // 새로운 frontmatter 객체
  const newData = {};

  // title (필수)
  if (data.title) {
    newData.title = data.title;
  }

  // description (meta에서 추출)
  if (data.meta) {
    const description = extractDescription(data.meta);
    if (description) {
      newData.description = description;
    }
  } else if (data.description) {
    newData.description = data.description;
  }

  // tags (배열 형식으로 정규화)
  if (data.tags) {
    if (Array.isArray(data.tags)) {
      newData.tags = data.tags;
    } else if (typeof data.tags === 'string') {
      newData.tags = [data.tags];
    }
  }

  // created, updated (Git 히스토리에서)
  const dates = getGitDates(filePath);
  newData.created = data.created || dates.created;
  newData.updated = data.updated || dates.updated;

  // disqus (false만 유지)
  if (data.disqus === false || data.disqus === 'no') {
    newData.disqus = false;
  }
  // disqus: true, 'yes' 등은 제거 (기본값)

  // 레거시 필드 제거 목록
  const removedFields = [];
  const legacyFields = ['lang', 'meta', 'feed', 'sidebar', 'author'];

  legacyFields.forEach(field => {
    if (data[field]) {
      removedFields.push(field);
    }
  });

  // exclude 필드 제거 (폴더 기반으로 관리)
  if (data.exclude) {
    removedFields.push('exclude');
  }

  // 새 파일 쓰기
  const newContent = matter.stringify(markdownContent, newData);
  fs.writeFileSync(filePath, newContent, 'utf-8');

  console.log(`✅ 완료`);
  console.log(`   → title: ${newData.title || '(없음)'}`);
  console.log(`   → description: ${newData.description ? '✓' : '✗'}`);
  console.log(`   → tags: ${newData.tags ? newData.tags.length + '개' : '(없음)'}`);
  console.log(`   → created: ${newData.created}`);
  console.log(`   → updated: ${newData.updated}`);
  if (removedFields.length > 0) {
    console.log(`   🗑️  제거됨: ${removedFields.join(', ')}`);
  }

  return true;
}

// 메인 실행
function main() {
  console.log('🚀 Frontmatter 마이그레이션 시작...\n');
  console.log(`📂 대상 디렉토리: ${srcDir}`);
  console.log(`💾 백업 디렉토리: ${backupDir}\n`);

  // 백업 디렉토리 생성
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const mdFiles = findMdFiles(srcDir);
  console.log(`📝 총 ${mdFiles.length}개의 마크다운 파일 발견\n`);

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of mdFiles) {
    try {
      const result = migrateFrontmatter(file);
      if (result) {
        processedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ 오류 발생: ${file}`);
      console.error(`   ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 마이그레이션 완료!');
  console.log('='.repeat(60));
  console.log(`✅ 처리됨: ${processedCount}개`);
  console.log(`⏭️  건너뜀: ${skippedCount}개`);
  console.log(`❌ 오류: ${errorCount}개`);
  console.log(`💾 백업 위치: ${backupDir}`);
  console.log('\n💡 Tip: 백업 파일은 모든 변경사항이 정상인지 확인 후 삭제하세요.');
}

main();

