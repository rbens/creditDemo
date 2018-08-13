/**
 * FormatFilter utils
 */
class FormatFilter{
   static euro(data){
       return data ? data.toFixed(2).concat(' €')  : '';
    }

    static year(data){
       return data ? data +' ans' : '';
    }

    static rate(data){
       return data ? data.toFixed(2).concat(' %')  : '';
    }
}

export default FormatFilter;