// 1. スクロール時にフェードイン
document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');

  function checkVisibility() {
    fadeInElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        element.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // ページ読み込み時にもチェック
});

// 2. ホバー時に文字色を変える
const hoverTextElements = document.querySelectorAll('.hover-text');

hoverTextElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.color = '#3498db'; // ホバー時に青色に変化
    element.style.transition = 'color 0.3s ease';
  });

  element.addEventListener('mouseleave', () => {
    element.style.color = ''; // ホバー解除時に元に戻る
  });
});

// 3. タイピングエフェクト
const typingElements = document.querySelectorAll('.typing-effect');

typingElements.forEach(element => {
  const text = element.textContent;
  element.textContent = '';
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
});

// 4. テキストに背景色がフェードイン
const backgroundFadeElements = document.querySelectorAll('.bg-fade');

backgroundFadeElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    element.style.backgroundColor = '#f4f4f4'; // 背景色にフェード
    element.style.transition = 'background-color 0.5s ease';
  });

  element.addEventListener('mouseleave', () => {
    element.style.backgroundColor = ''; // 背景色解除
  });
});
