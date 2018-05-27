import React,{Component} from 'react';
import Slider from 'react-slick';
import Paper from 'material-ui/Paper';
import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';

class CustomSlider extends Component{

    

    cards1 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={image2} style={{height:"100%",width:"100%"}} className="img-responsive" alt="logo"/>
                 <div>  </div>
                </Paper>
            </div>
        )
    }

    cards2 = () => {
        return (
            <div>
                <Paper style={style} zDepth={3} circle={false} >
                 <img src={image4} style={{height:"100%",width:"100%"}} className="img-responsive" alt="logo"/>
                 <div> <label style={{fontWeight:'bold',color: '#333',fontSize:'20px'}}> </label> </div>
                </Paper>
            </div>
        )
    }

    
    

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade:true,
            autoPlay: true ,
            autoplaySpeed: 500	
        };
        return (

            <div className="col-md-12" >
                <Slider {...settings}>
                    {this.cards1()}
                    {this.cards2()}
                    
                </Slider>
            </div>
        )
    }
}

const style = {
    height: 500,
    width: 1000,
    margin: 30,
    textAlign: 'center',
    display: 'inline-block',
    marginBottom:"30px"
};

export default CustomSlider;