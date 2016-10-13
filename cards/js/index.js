// http://zhitanska.com/sites/default/files/images/stories/ZHVV/Vselennaya/Venera.jpg

function onmousedown(event) {
		console.log(event);
	var pageX = (event.type.toLowerCase() === 'mousedown') ? event.pageX : event.touches[0].pageX;
		dragging = {
			startedAt: {
				x: pageX,
				y: event.clientY
			},
			lastDiff: {x:0,y:0},
			card: this
		};
	};

function addCard() {
	var url = document.getElementById("url").value;
	var cardsContainer = document.querySelector("#cardsContainer > div");
	var card = document.createElement("card");
	card.style.backgroundImage = "url("+url+")";
	cardsContainer.insertBefore( card, cardsContainer.firstChild );
	card.onmousedown = onmousedown;
}
/*initCards = function(){
          var container = document.querySelectorAll(".cardsContainer");
        [].forEach.call(container, function(cont) {
        var cards = cont.querySelectorAll("figure.active");
        var el = cards[0];
        var el2 = cards[1];
        if(typeof el2 == "object"){
        el2.classList.add("second");
        var mover = false, x, y, startX, driverX, posx, posy, first = true;
        el.onmousedown = function() {
            mover = true;
            el.classList.remove("second");
            el.classList.remove("back");
            el.classList.add("stopanimation");
        };
        el.onmouseup = function(e) {
            mover = false;
            first = true;
           
            this.classList.remove("stopanimation");
            this.style ="";
            distanceX = startX-e.pageX;
            console.log(distanceX);
            if(distanceX > 100){
              this.classList.add("back");
              this.classList.add("second");
              this.classList.remove("first");
              this.classList.remove("active");
              el2.classList.remove("second");
              el2.classList.add("first");
              initCards();

            }else{
              el2.style.webkitTransform = "scale(0.9)";
            }
        };
        el.onmousemove = function(e) {
            if (mover) {
                if (first) {
                    x = e.offsetX;
                    y = e.offsetY;
                    first = false;
                    startX = e.pageX;
                }
                posx = e.pageX - x;
                posy = e.pageY - y;
              
                 driverX = startX-e.pageX;


                this.style.left = posx-cont.offsetLeft + 'px';
                //this.style.top = posy + 'px';
                this.style.webkitTransform = "rotate(-"+driverX/15+"deg) translate("+(posx-cont.offsetLeft + 'px')+")";

                var scaleofel2 = (900+Math.round(driverX/3))/1000;
              console.log(scaleofel2);

                if(scaleofel2 > 1 ){ scaleofel2 = 1; }
                if(scaleofel2 < 0.9 ){ scaleofel2 = 0.9; }
                el2.style.webkitTransform = "scale("+scaleofel2+")";
            }
        };
          }
      });

}
*/

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}



var dragging = null;

function initCards() {
	var cards = document.getElementsByTagName("card");
	for(var i=0; i<cards.length; i++) {
		var card = cards[i];
		card.onmousedown = onmousedown;
		card.ontouchstart = onmousedown;
	}
	
	document.body.onmousemove = function(event){
			if(!dragging)
				return;
		var pageX = (event.type.toLowerCase() === 'mousemove') ? event.pageX : event.touches[0].pageX;
			var diff = {
				x: pageX - dragging.startedAt.x,
				y: event.clientY - dragging.startedAt.y
			};
		dragging.lastDiff = diff;
			dragging.card.style.webkitTransform = "translateX("+diff.x+"px) rotate("+(diff.x/30)+"deg)";
		dragging.card.style.opacity = 1-Math.min(1,Math.abs(0.002*diff.x));
		};
	document.body.ontouchmove = document.body.onmousemove;
	document.body.onmouseup = function(event){
		if(!dragging)
				return;
		var toBeDeleted = Math.abs(dragging.lastDiff.x) > dragging.card.offsetWidth / 2;
		if(!toBeDeleted) {
				dragging.card.style.webkitTransform = "translateX(0) rotate(0)";
				dragging.card.style.opacity = 1;
				dragging = null;
			} else {
				dragging.card.style.webkitTransform = "translateX("+(dragging.lastDiff.x>0 ? 1000 : -1000)+"px) rotate("+(dragging.lastDiff.x>0 ? 90 : -90)+"deg)";
				document.body.ontouchend = document.body.onmouseup;
				console.log(dragging.card.style.webkitTransform);
				dragging.card.style.opacity = 0;
				setTimeout(function(){
					dragging.card.remove();
				}, 500);
			}
		}; 
};

window.onload = function() {
  initCards();
}