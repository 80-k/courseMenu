#!/usr/bin/env node

/**
 * 번역 검증 스크립트
 * 
 * 모든 번역 키가 지원되는 언어에 존재하는지 검증하고,
 * 누락된 번역이나 사용되지 않는 번역을 찾아 보고합니다.
 * 
 * Usage: node scripts/validate-translations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 설정
const CONFIG = {
  LANGUAGES: ['ko', 'ja'],
  SRC_DIR: path.join(__dirname, '..', 'src'),
  I18N_DIR: path.join(__dirname, '..', 'src', 'i18n', 'language-data'),
  IGNORE_PATTERNS: [
    /node_modules/,
    /dist/,
    /\.git/,
    /\.d\.ts$/,
    /\.test\./,
    /\.spec\./
  ]
};

/**
 * 번역 파일들을 로드
 */
function loadTranslations() {
  const translations = {};
  
  CONFIG.LANGUAGES.forEach(lang => {
    const filePath = path.join(CONFIG.I18N_DIR, `${lang === 'ko' ? 'korean' : 'japanese'}-texts.ts`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      // 간단한 파싱 (실제로는 더 정교한 파싱이 필요할 수 있음)
      const exportMatch = content.match(/export const \w+ = ({[\s\S]*});?\s*$/m);
      
      if (exportMatch) {
        // eval 대신 더 안전한 방법을 사용해야 하지만, 개발 도구이므로 허용
        try {
          const obj = eval('(' + exportMatch[1] + ')');
          translations[lang] = obj;
        } catch (e) {
          console.error(`Error parsing ${lang} translations:`, e.message);
          translations[lang] = {};
        }
      }
    } catch (error) {
      console.error(`Error reading ${lang} translation file:`, error.message);
      translations[lang] = {};
    }
  });
  
  return translations;
}

/**
 * 소스 파일에서 번역 키들을 추출
 */
function extractTranslationKeys(dir = CONFIG.SRC_DIR) {
  const keys = new Set();
  
  function scanDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      // 무시할 패턴 체크
      if (CONFIG.IGNORE_PATTERNS.some(pattern => pattern.test(itemPath))) {
        return;
      }
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // translate('key') 패턴 찾기
        const matches = content.match(/translate\s*\(\s*['"`]([^'"`]+)['"`]/g);
        if (matches) {
          matches.forEach(match => {
            const keyMatch = match.match(/['"`]([^'"`]+)['"`]/);
            if (keyMatch) {
              keys.add(keyMatch[1]);
            }
          });
        }
      }
    });
  }
  
  scanDirectory(dir);
  return Array.from(keys);
}

/**
 * 중첩된 객체에서 키 경로들을 추출
 */
function extractNestedKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...extractNestedKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * 번역에서 키 존재 여부 확인
 */
function hasNestedKey(obj, key) {
  const keys = key.split('.');
  let current = obj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return false;
    }
  }
  
  return current !== null && current !== undefined && current !== '';
}

/**
 * 메인 검증 함수
 */
function validateTranslations() {
  console.log('🌐 번역 검증을 시작합니다...\n');
  
  // 1. 번역 파일들 로드
  console.log('📄 번역 파일들을 로드하고 있습니다...');
  const translations = loadTranslations();
  
  // 2. 소스 코드에서 사용된 키들 추출
  console.log('🔍 소스 코드에서 번역 키들을 추출하고 있습니다...');
  const usedKeys = extractTranslationKeys();
  
  // 3. 번역 파일에서 정의된 키들 추출
  const definedKeys = {};
  CONFIG.LANGUAGES.forEach(lang => {
    definedKeys[lang] = extractNestedKeys(translations[lang]);
  });
  
  console.log(`\n📊 통계:`);
  console.log(`   사용된 키: ${usedKeys.length}개`);
  CONFIG.LANGUAGES.forEach(lang => {
    console.log(`   ${lang.toUpperCase()} 정의된 키: ${definedKeys[lang].length}개`);
  });
  
  // 4. 누락된 번역 찾기
  console.log('\n❌ 누락된 번역들:');
  let hasMissing = false;
  
  CONFIG.LANGUAGES.forEach(lang => {
    const missing = usedKeys.filter(key => !hasNestedKey(translations[lang], key));
    
    if (missing.length > 0) {
      hasMissing = true;
      console.log(`\n   ${lang.toUpperCase()}에서 누락된 키들 (${missing.length}개):`);
      missing.forEach(key => console.log(`   - ${key}`));
    }
  });
  
  if (!hasMissing) {
    console.log('   ✅ 모든 사용된 키가 번역되어 있습니다!');
  }
  
  // 5. 사용되지 않는 번역 찾기
  console.log('\n⚠️  사용되지 않는 번역들:');
  let hasUnused = false;
  
  CONFIG.LANGUAGES.forEach(lang => {
    const unused = definedKeys[lang].filter(key => !usedKeys.includes(key));
    
    if (unused.length > 0) {
      hasUnused = true;
      console.log(`\n   ${lang.toUpperCase()}에서 사용되지 않는 키들 (${unused.length}개):`);
      unused.slice(0, 10).forEach(key => console.log(`   - ${key}`));
      if (unused.length > 10) {
        console.log(`   ... 그리고 ${unused.length - 10}개 더`);
      }
    }
  });
  
  if (!hasUnused) {
    console.log('   ✅ 모든 정의된 키가 사용되고 있습니다!');
  }
  
  // 6. 번역 완성도 계산
  console.log('\n📈 번역 완성도:');
  CONFIG.LANGUAGES.forEach(lang => {
    const totalKeys = usedKeys.length;
    const translatedKeys = usedKeys.filter(key => hasNestedKey(translations[lang], key)).length;
    const completeness = totalKeys > 0 ? Math.round((translatedKeys / totalKeys) * 100) : 100;
    
    console.log(`   ${lang.toUpperCase()}: ${completeness}% (${translatedKeys}/${totalKeys})`);
  });
  
  // 7. 결과 요약
  console.log('\n' + '='.repeat(50));
  if (hasMissing) {
    console.log('❌ 검증 실패: 누락된 번역이 있습니다.');
    process.exit(1);
  } else {
    console.log('✅ 검증 성공: 모든 번역이 완료되었습니다.');
  }
  
  if (hasUnused) {
    console.log('⚠️  주의: 사용되지 않는 번역이 있습니다. 정리를 고려해보세요.');
  }
}

// 스크립트 실행 (ES module)
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    validateTranslations();
  } catch (error) {
    console.error('❌ 검증 중 오류 발생:', error.message);
    process.exit(1);
  }
}