# parking_lot dk
Author : irpan.kusuma@gmail.com / anonymous.ikwijaya@gmail.com

- Requirement
    - Node JS

# How to Use
- Open index.js, then change
- Scroll to bottom, at Section @Example
- Added your string text, example
    - only accepted four function
    - create_parking_lot {n}
    - park {car_number}
    - leave {car_number} // calculate datetime
    - status    
- Open command line, and goto this project parking_lot
- parking_lot #>node index.js

# Example
<code>
    let str = 'create_parking_lot 6 \n' 
    str += 'park KA-01-HH-1234 \n'             
    str += 'park KA-01-HH-9999 \n'             
    str += 'park KA-01-BB-0001 \n'             
    str += 'park KA-01-HH-7777 \n'             
    str += 'park KA-01-HH-2701 \n'             
    str += 'park KA-01-HH-3141 \n'    
    str += 'leave KA-01-HH-3141 \n'             
    str += 'status \n'    
    str += 'park KA-01-P-333 \n'    
    str += 'park DL-12-AA-9999 \n'    
    str += 'leave KA-01-HH-1234 \n'    
    str += 'leave KA-01-BB-0001 \n'
    str += 'leave DL-12-AA-9999 \n'
    str += 'park KA-09-HH-0987 \n'
    str += 'park CA-09-IO-1111 \n'
    str += 'park KA-09-HH-0123 \n'
    str += 'status'; 
</code>
