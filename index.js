'use strict';

/**
 * Author : irpan.kusuma@gmail.com
 * Class ParkingLot
 * data_parking = for store every user create new slot, update (added) slot, or delete (leave) slot
 * car_no = for handling input because as global
 */
class ParkingLot {
    constructor(){
        this.data_parking = [];
        this.car_no = null;
    }

    /**
     * func insertCarNo
     * Handle global car_no
     */
    set insertCarNo(car_no){
        this.car_no = car_no;
    }

    /**
     * func insert
     * Handle for added data within global
     */
    set insert(n=0){
        let _data = [];
        try {
            for(let i=0; i<n; i++){
                _data.push({
                    id: i+1,
                    car_no: null,
                    color: null,
                    start: null,
                    end: null
                })
            }
            
            this.data_parking = _data;
        } catch (error) {
            throw "Error when insert data.("+error+")";
        }
    }

    /**
     * func update
     * Handle change data by id
     * Example data = { id: 1, data: { obj_data } }
     */
    set update(data={}){
        try {
            let filter = []
            filter = this.data_parking.filter((k) => k.id != data.id)
            filter.push(data.data)
            this.data_parking = filter;
        } catch (error) {
            throw "Error when update data.("+error+")";
        }
    }

    /**
     * func selectByCarNo
     * Handle data when car_no equal car_no
     */
    get selectByCarNo(){
        try {
            let filter = this.data_parking.filter((k) => k.car_no == this.car_no);
            // console.log(filter)
            return filter;
        } catch (error) {
            throw "Error when selecting data by Id.("+error+")";
        }
    }

    /**
     * func selectFreeSlot
     * Handle data when car_no is empty, or free slot
     */
    get selectFreeSlot(){
        try {
            return this.data_parking.filter((k) => k.car_no == null);
        } catch (error) {
            throw "Error when selecting free slot.("+error+")";
        }
    }

    /**
     * funct select
     * Handle all data for show status
     */
    get select(){
        try {
            return this.data_parking;    
        } catch (error) {
            throw "Error when select.("+error+")";
        }
    }

    /**
     * Function for first time handle input
     * String must be have <\n> enter, for split to array
     * @param {*} string 
     * @result as string
     */
    splitFn(string=null){
        let split = [];
        let output = [];
        split = string.split("\n");
        split.pop();

        for(let i=0;i<split.length;i++){
            let sp = split[i].split(' ');
            if(sp[0] == 'create_parking_lot'){
                output.push(this.createParkingLot(sp[1]));
            } else if(sp[0] == 'park'){
                output.push(this.park(sp[1]))
            } else if(sp[0] == 'leave'){
                output.push(this.leave(sp[1]))
            } else if(sp[0] == 'status'){
                output.push(this.status())
            } else {
                output.push('Command not found.')
            }
        }

        
        return output.join("\n");
    }

    /**
     * For create parking lot
     * @param {*} n must be number
     * @result as string
     */
    createParkingLot(n=0){
        if(Number.isInteger(n))
            return 'Please input integer';

        this.insert = n;
        return 'Created parking lot with '+n+ ' slot(s).';
    }

    /**
     * For parking lot, update global data_parking
     * @param {*} car_no 
     */
    park(car_no=null){
        let freeSlot = this.selectFreeSlot;
        if(freeSlot.length == 0){
            return 'Sorry, parking lot is full';
        }

        let n = []
        for(let i=0; i<freeSlot.length; i++){
            n.push(freeSlot[i].id)
        }

        this.update = {
            id: Math.min(...n),
            data:{
                id: Math.min(...n),
                car_no: car_no,
                color: null,
                start: new Date(),
                end: null
            }
        };
        return 'Allocated slot number : ' + Math.min(...n);
    }

    /**
     * For update global data parking
     * @param {*} car_no 
     */
    leave(car_no=null){
        this.insertCarNo = car_no;
        let filter = this.selectByCarNo;
        if(filter.length == 0){
            return 'Car Number not found.'
        }
        
        let start = filter.length > 0 ? filter[0].start : null;
        let id = filter.length > 0 ? filter[0].id : null;
        
        this.update = {
            id: id,
            data: {
                id: id,
                car_no: null,
                color: null,
                start: null,
                end: null
            }
        };

        /// calculate pembayaran 
        let calculate = this.billCalculate(start);
        let totalFree = this.selectFreeSlot.length;

        let output = '\n======== BILLING PAYMENT ========== \n';
        output += 'Registration No  : '+car_no+' \n';
        output += 'Last Slot No     : '+id+' \n';
        output += 'Free Slot No     : '+id+' \n';
        output += 'Total Free       : '+totalFree+' slot(s) \n';
        output += 'Start Time       : '+calculate.dateStart+' \n';
        output += 'End Time         : '+calculate.dateEnd+' \n';
        output += 'Charge           : '+calculate.result+' for '+calculate.hours+' hour(s) \n';
        output += '===================================';
        return output;
    }

    /**
     * For calculate price
     * @param {*} start 
     */
    billCalculate(start=null){
        let dateEnd = new Date().getHours();
        let dateStart = new Date(start).getHours();
        let finish = []

        let calculate = dateEnd - dateStart;
        for(let i=0; i<calculate; i++){
            if(i == 0 || i == 1){
                finish.push(5)
            } else {
                finish.push(10)
            }
        }

        return {
            result: finish.length > 0 ? finish.reduce((a,b) => a+b) : 0,
            dateStart: new Date(start),
            dateEnd: new Date(),
            hours: calculate
        }
    }

    /**
     * For show status parking
     */
    status(){
        let data = this.select;
        let output = '\n======== STATUS PARKING LOT ========== \n';
        output += 'Slot No.  Registration No. \n';
        data.sort((a,b) => a.id - b.id);
        
        for(let i=0; i<data.length; i++){ 
            let id = 0
            id = data[i].id
            output += '    '+id + '         ';
            output += data[i].car_no == null ? 'Free \n' : data[i].car_no+ ' \n'
        }

        output += '======================================';
        return output;
    }
}

/**
 * Section @Example
 */

// change here ...
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
str += 'status'                        
// end

// don`t change 
let parkingLot = new ParkingLot();
console.info(parkingLot.splitFn(str));
// end

/**
 * Result
 * See folder images
 */
