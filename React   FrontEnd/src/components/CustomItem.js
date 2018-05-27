import React,{Component} from  'react';

class CustomItem extends Component
{
    render(){
        return(
            <div>
                <div className="row" style={itemStyle}>
                    {this.props.name}
                </div>
                {/* <div className="row" style={{marginTop:'0px'}}>
                    <hr style={{borderTop:'2px solid #8c8b8b'}}/>
                </div> */}
            </div>
        )
    }
}

const itemStyle={
    color:'white',
    fontSize:'20px',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight: '600',
    letterSpacing:'.03em',
    lineHeight: 'inherit',
    marginTop:'7px',
    cursor:'pointer',

}

export default CustomItem;