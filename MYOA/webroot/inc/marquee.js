// marquee box

// Array prototype ,for IE 5
if (!Array.prototype.push){
    Array.prototype.push = function (Item){
        this[this.length] = Item;
        return this.length;
    };
}
marquee = function(Name){
    // default
    this.Speed = 60;        // scroll speed
    this.Delay = 60000;      // delay timeout
    this.Rows = 1;          // rows of keep
    this.Cols = 1;          // cols of keep
    this.Height = 18;       // height of block
    this.Width = '100%';       // width of block
    this.Direct = 'up';     // up,down,left,right

    this.Id = 0;
    this.Name = Name;       // marquee box name,ascii
    this.Content = new Array();
    this.DelayInterval = null;
    this.ScrollInterval = null;
    eval('window.' + this.Name + '= this;');
};
// internal function
marquee.prototype.setDelay = function(Delay){
    this.Delay=Delay;
};
// internal function
marquee.prototype.getObj = function(objId){
    if(navigator.appName!='Microsoft Internet Explorer'){
        return document.getElementById(objId);
    }else{
        try{
            return document.all[objId];
        }catch(e){return null;}
    }
};
// drawing
marquee.prototype.init = function(content){
    this.Content = content;
    document.write('<div id="' + this.Name + '" style="overflow:hidden;height:' + this.Rows * this.Height + 'px;width:' + this.Cols * this.Width + 'px;">');
    document.write('<div style="overflow:hidden;height:' + this.Height + 'px;width:' + this.Width + 'px;">' + this.Content[this.Id] + '</div></div>');
    this.getObj(this.Name).onmouseover = function(){
        if (this.id != ''){
            var Obj = eval('window.' + this.id);
            clearInterval(Obj.DelayInterval);
        }
    };
    this.getObj(this.Name).onmouseout = function(){
        if (this.id != ''){
            var Obj = eval('window.' + this.id);
            Obj.DelayInterval = setInterval(Obj.Name + ".start()",Obj.Delay);
        }
    };
    this.DelayInterval = setInterval(this.Name + ".start()",this.Delay);

};

marquee.prototype.start = function(){
    var marqueeBox = this.getObj(this.Name);
    this.Id++;
    if(this.Id > this.Content.length - 1) this.Id = 0;
    if(marqueeBox.childNodes.length <= this.Rows) {
        var nextLine = document.createElement('DIV');
        nextLine.style.overflow = 'hidden';
        nextLine.style.height = this.Height;
        nextLine.style.width = this.Width;
        nextLine.innerHTML = this.Content[this.Id];
        marqueeBox.appendChild(nextLine);
    } else {
        marqueeBox.childNodes[0].innerHTML = this.Content[this.Id];
        marqueeBox.appendChild(marqueeBox.childNodes[0]);
        marqueeBox.scrollTop = 0;
    }
    clearInterval(this.ScrollInterval);
    this.ScrollInterval = setInterval(this.Name + ".scroll()",this.Speed);
};
marquee.prototype.scroll = function(){
    this.getObj(this.Name).scrollTop++;
    if(this.getObj(this.Name).scrollTop % this.Height == (this.Height - 1)){
        clearInterval(this.ScrollInterval);
    }
};

