'use strict';

class ParkingLot {
    constructor(){
        this.data_parking = [];
        this.car_no = null;
    }

    set insertCarNo(car_no){
        this.car_no = car_no;
    }

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

    get selectByCarNo(){
        try {
            let filter = this.data_parking.filter((k) => k.car_no == this.car_no);
            // console.log(filter)
            return filter;
        } catch (error) {
            throw "Error when selecting data by Id.("+error+")";
        }
    }

    get selectFreeSlot(){
        try {
            return this.data_parking.filter((k) => k.car_no == null);
        } catch (error) {
            throw "Error when selecting free slot.("+error+")";
        }
    }

    get select(){
        try {
            return this.data_parking;    
        } catch (error) {
            throw "Error when select.("+error+")";
        }
    }

    /// Function
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

    createParkingLot(n=0){
        this.insert = n;
        return 'Created parking lot with '+n+ ' slot(s).';
    }

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
        return 'Registration number '+car_no+' with Slot Number '+id+' is free with Charge '+calculate;
    }

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

        return finish.length > 0 ? finish.reduce((a,b) => a+b) : 0
    }

    status(){
        let data = this.select;
        let output = 'Slot No.  Registration No. \n';
        data.sort((a,b) => a.id - b.id);
        
        for(let i=0; i<data.length; i++){ 
            let id = 0
            id = data[i].id
            output += '    '+id + '         ';
            output += data[i].car_no == null ? 'Free \n' : data[i].car_no+ ' \n'
        }

        return output;
    }
}

let parkingLot = new ParkingLot();
let str = 'create_parking_lot 1 \n' // create 3 slot
str += 'park AB-111 \n'     // alocated
str += 'park AB-112 \n'     // alocated
str += 'park AB-113 \n'     // alocated
str += 'park AB-114 \n'     // full
str += 'park AB-115 \n'    // leave with calculate
str += 'leave AB-112 \n'    // leave with calculate
str += 'status \n'          // status parking


// let arr = str.split('\n'); arr.pop();
// console.log(arr)
console.info(parkingLot.splitFn(str));