// pages/analyze/analyze.js
Page({
  data:{},
  onLoad:function(options){
    let percent = [0.3,0.4,0.5];
    let analyzeCoord = [[150,200*Math.sin(Math.PI/3)*(1-percent[0])],[150*(1-percent[1]),100*Math.sin(Math.PI/3)*(2+percent[1])],[150*(1+percent[2]),300*Math.sin(Math.PI/3)-100*Math.sin(Math.PI/3)*(1-percent[2])]];
    const ctx = wx.createCanvasContext('analyzeChart');
    ctx.setStrokeStyle('#6F6F6F');
    for(let i=0;i<6;i++){
      ctx.beginPath()
      ctx.moveTo(150,100/3*Math.sin(Math.PI/3)*i)
      ctx.lineTo(300-25*i,300*Math.sin(Math.PI/3)-100/6*Math.sin(Math.PI/3)*i);
      ctx.lineTo(25*i,300*Math.sin(Math.PI/3)-100/6*Math.sin(Math.PI/3)*i);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.moveTo(150,0);
    ctx.lineTo(150,200*Math.sin(Math.PI/3))
    ctx.lineTo(0,300*Math.sin(Math.PI/3))
    ctx.moveTo(150,200*Math.sin(Math.PI/3))
    ctx.lineTo(300,300*Math.sin(Math.PI/3))
    ctx.stroke();
    ctx.setFillStyle('rgba(255, 197, 255, .5)');
    ctx.beginPath();
    ctx.moveTo(analyzeCoord[0][0],analyzeCoord[0][1]);
    ctx.lineTo(analyzeCoord[1][0],analyzeCoord[1][1]);
    ctx.lineTo(analyzeCoord[2][0],analyzeCoord[2][1])
    ctx.closePath();
    ctx.fill();
    ctx.draw();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})