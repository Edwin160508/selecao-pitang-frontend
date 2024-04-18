
export class DateUtils {

    constructor() { }

    /**
     * Concatenate 0 for numbers below 10
     * @param number 
     * @returns String
     */
    private static concatZeroMonthOrDay(number: number): String{
        let zero = "0";
        if(number <= 9){
            return zero+number;
        }else{
            return number.toString();
        }

    }

    public static convertDateToString(date: Date): String{
        let month = date.getMonth()+1;        
        return date.getFullYear()+"-"+this.concatZeroMonthOrDay(month)+"-"+this.concatZeroMonthOrDay(date.getDate());
    }

    public static convertStringToDate(dateString: String): Date{
        let date = new Date();
        let year = dateString.substring(0,4);
        let month= dateString.substring(5,7);
        let day = dateString.substring(8);
        
        date.setDate(Number(day));
        date.setMonth(Number(month)-1);
        date.setFullYear(Number(year))
        
        return date;
        
    }

    
}