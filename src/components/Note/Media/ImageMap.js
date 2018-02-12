import React from 'react'

class ImageMap extends React.Component {

    componentWillMount(){
        this.state = {
            image: this.props.image,
            description: ""
        }
    }

    componentDidMount(){
        this.drawImage()
    }

  render(){


    let viewDescrip = this.viewDescrip.bind(this)

        return <div>

            <canvas id="myCanvas" ref="myCanvas" onClick={this.viewDescrip.bind(this)} style={{border:"1px solid #000000"}}>
            Your browser does not support the HTML5 canvas tag.
            </canvas>

            <div>{this.state.description}</div>

            <canvas id="sprite" ref="sprite" style={{border:"1px solid #000000"}}>
            Your browser does not support the HTML5 canvas tag.
            </canvas>

        </div>
  }

mouseIsInAnArea(evt){
    let canvas = this.refs.myCanvas
    const mousePos = this.getMousePos(canvas, evt);
    let intersects = this.intersects

    let isIn = false

    this.state.image.areas.map(function(a, index){
        let coords = a.coords.split(",")
        if(intersects(coords, mousePos)){
            isIn = {index: index}
        }
    })
    
    return isIn
}

  viewDescrip(e){
    e.preventDefault()
    this.writeMessage(e);
  }

sprite (options) {
                
    var that = {};
                    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.sourceX = options.sourceX
    that.sourceY = options.sourceY
    that.destX = options.destX
    that.destY = options.destY
    that.destWidth = options.destWidth
    that.destHeight = options.destHeight

    that.render = function () {
        // Draw the animation
        that.context.drawImage(
           that.image,
           that.sourceX,
           that.sourceY,
           that.width,
           that.height,
           that.destX,
           that.destY,
           that.destWidth,
           that.destHeight
        );
    };

    return that;
}

  drawImage(){
    let sprite = this.sprite
    let canvas = this.refs.myCanvas

    canvas.width = 500;
    canvas.height = 500;

    let areas = this.state.image.areas
    let i = 0
    let y = 0
    let x = 0

    var img = new Image();   // Create new img element
    img.addEventListener('load', function() {
      // execute drawImage statements here
      var ctx= canvas.getContext("2d");
      ctx.drawImage(img,0,0);

     /* ctx.strokeStyle="#F5F5F5";

      while(y <= 500){
        x = 0
        while(x <= 500){
            ctx.rect(x,y,50,50);
            ctx.stroke();
            x = x+50;
        }
        y = y+50;
      }
*/
    let colors = ["green","blue","#F5F5F5","yellow","purple","gray","black"]

      while( i < areas.length){
        let c = areas[i].coords.split(",")
        ctx.strokeStyle=colors[i];
        ctx.beginPath();
        ctx.rect(c[0],c[1],c[2],c[3]);
        ctx.stroke();
        i++;
      }

    }, false);

    img.src = this.state.image.src; // Set source path
    img.useMap = "#"+this.state.image.name
    const writeMessage = this.writeMessage.bind(this)
    const getMousePos = this.getMousePos.bind(this)

    canvas.addEventListener('mousemove', function(evt) {
        writeMessage(evt);
    }, false);

  }

  writeMessage(evt) {
    let message = this.props.image.description
    let intersects = this.intersects
    let index = false

    if(index = this.mouseIsInAnArea(evt)){
        message = this.state.image.areas[index.index].description

        let coords = this.state.image.areas[index.index].coords.split(",")
        let canvas2 = this.refs.sprite
        
        canvas2.width = coords[2];
        canvas2.height = coords[3];

        let context = canvas2.getContext("2d")

        context.clearRect(0, 0, canvas2.width, canvas2.height);

        var zoomed = this.sprite({
            context: context,
            width: coords[2],
            height: coords[3],
            image: this.refs.myCanvas,
            sourceX: coords[0],
            sourceY: coords[1],
            destX: 0,
            destY: 0,
            destWidth: coords[2],
            destHeight: coords[3]
        });

        zoomed.render()

    }

    this.setState({description: message})

  }

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  intersects(coords, mousePos){

    let xStart = parseInt(coords[0],10)
    let xEnd = parseInt(coords[0])+parseInt(coords[2])

    let yStart = parseInt(coords[1],10)
    let yEnd = yStart+parseInt(coords[2])

    let xIsInPath = mousePos.x >=  xStart && mousePos.x <= xEnd
    let yIsInPath = mousePos.y >= yStart && mousePos.y <= yEnd
    
    return yIsInPath && xIsInPath

  }
   

}

export default ImageMap;