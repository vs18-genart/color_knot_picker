function Knot(_p, _q){  
    // knot points are generally considered in the [-1,1]^3 space
    // they can go outside this boundary but [-1,1] is used to map them the color space boundary
    this.p=_p;
    this.q=_q;
    this.r_x = 0;
    this.r_y = 0;
    this.r_z = 0;
    this.center = createVector(0,0,0);
    this.scale  = createVector(0.5,0.5,0.5);
    
    this.getPoint= function( t){
        // input t should be in the interval [0,1]
        t*=TWO_PI;
        let r = cos(this.q*t)*0.5+1; // r varies between 0.5 and 1 --> TODO: parameterize using min_r and max_r
        let res= createVector(  r * cos(this.p*t),
                                -sin(this.q*t),
                                r * sin(this.p*t));
        // res.x*=scale.x;
        // res.y*=scale.y;
        // res.z*=scale.z;
        //rotate in z, y, x
        // res = rotX(this.r_x,res.copy());
        // res = rotY(this.r_y,res.copy());
        // res = rotZ(this.r_z,res.copy());
        
        res.add(this.center);
        return res;
    }
}


function rotZ( ang, p){
    let pp= p.copy();
    let m = [   [cos(ang), -sin(ang),  0.],
                [sin(ang),  cos(ang),  0.],
                [     0.0,       0.0,  1.]];
                        
    return createVector(m[0][0]*pp[0]+m[0][1]*pp[1]+m[0][2]*pp[2],
                        m[1][0]*pp[0]+m[1][1]*pp[1]+m[1][2]*pp[2],
                        m[2][0]*pp[0]+m[2][1]*pp[1]+m[2][2]*pp[2]);
}

function rotY( ang, p){
    let pp= p.copy();
    let m =[[ cos(ang), 0.0,  sin(ang)],
            [      0.0,  1.,       0.0],
            [-sin(ang), 0.0,  cos(ang)]];
                        
    return createVector(m[0][0]*pp[0]+m[0][1]*pp[1]+m[0][2]*pp[2],
                        m[1][0]*pp[0]+m[1][1]*pp[1]+m[1][2]*pp[2],
                        m[2][0]*pp[0]+m[2][1]*pp[1]+m[2][2]*pp[2]);
}

function rotX( ang, p){
    let pp= p.copy();
    let m = [[ 1.0,     0.0,       0.0],
                [ 0.0, cos(ang), -sin(ang)],
                [ 0.0, sin(ang),  cos(ang)]];
                        
    return createVector(m[0][0]*pp[0]+m[0][1]*pp[1]+m[0][2]*pp[2],
                        m[1][0]*pp[0]+m[1][1]*pp[1]+m[1][2]*pp[2],
                        m[2][0]*pp[0]+m[2][1]*pp[1]+m[2][2]*pp[2]);
}