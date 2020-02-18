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
    let str = 'create_parking_lot 6 \n' <br />
    str += 'park KA-01-HH-1234 \n'      <br /> 
    str += 'park KA-01-HH-9999 \n'      <br />       
    str += 'park KA-01-BB-0001 \n'      <br />       
    str += 'park KA-01-HH-7777 \n'      <br />       
    str += 'park KA-01-HH-2701 \n'      <br />       
    str += 'park KA-01-HH-3141 \n'    <br />
    str += 'leave KA-01-HH-3141 \n'     <br />        
    str += 'status \n'    <br />
    str += 'park KA-01-P-333 \n'    <br />
    str += 'park DL-12-AA-9999 \n'    <br />
    str += 'leave KA-01-HH-1234 \n'    <br />
    str += 'leave KA-01-BB-0001 \n'<br />
    str += 'leave DL-12-AA-9999 \n'<br />
    str += 'park KA-09-HH-0987 \n'<br />
    str += 'park CA-09-IO-1111 \n'<br />
    str += 'park KA-09-HH-0123 \n'<br />
    str += 'status'; <br />
</code>

# Output

![alt text](https://raw.githubusercontent.com/irpankusuma/parking_lot/master/result.PNG)