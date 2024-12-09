document.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY; // スクロール位置
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach((button, index) => {
      // ボタンのオフセットを基準にして動きを調整
      let offset = (index - 5) * 100; // 5番目のボタンを基準に
      let position = scrollPosition - offset;  // スクロール位置に基づいて位置調整
      let opacity = 1 - Math.abs(position / 600); // スクロールに応じて透明度調整
      let scale = 1 + Math.abs(position / 1000); // スクロールに応じてスケールを調整
      let shadow = Math.abs(position / 100) * 10; // シャドウの大きさ
  
      // ボタンの移動量と透明度、スケール、影を変更
      button.style.transform = `translateY(${position * 0.4}px) scale(${scale})`; // 0.4でゆっくり動かす
      button.style.opacity = Math.max(opacity, 0.2); // 最低でも透明度は0.2に設定
      button.style.boxShadow = `0px ${shadow}px 20px rgba(0, 0, 0, 0.2)`; // 影を追加
  
      // 中央のボタンは大きくして、影を強くする
      if (index >= 4 && index <= 6) {
        button.style.transform = `translateY(${position * 0.6}px) scale(1.2)`;
        button.style.boxShadow = `0px 20px 25px rgba(0, 0, 0, 0.3)`;
      }
    });
  });
  
