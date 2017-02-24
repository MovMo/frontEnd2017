var Application={
    init:function(){
        this.qi=Object.create(Qi);
        this.qi.init();
        this.sizeSel=document.getElementById('qipan-sel');
        this.speedSel=document.getElementById('speed-sel');
        this.executeBtn=document.getElementById('execute-btn');
        this.refreshBtn=document.getElementById('refresh-btn');
        this.randomBuildBtn=document.getElementById('randomBuild-btn');
        this.addEvent();
    },
    addEvent:function(){
        this.sizeSel.addEventListener('change',this.setResolution.bind(this),false);
        this.speedSel.addEventListener('change',this.setDuration.bind(this));
        
    },
    setResolution:function(){
        this.qi.setResolution(this.sizeSel.value);
    },
    setDuration:function(){
        this.qi.setDuration(this.speedSel.value);
    }

 
};

var app=Object.create(Application);
app.init();
