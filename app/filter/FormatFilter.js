/**
 * FormatFilter utils
 */
class FormatFilter{
   static euro(data){
       return data.toLocaleString("fr-Fr", {style: "currency", currency: "EUR"});
    }

    static year(data){
       return data ? data +' ans' : '';
    }

    static rate(data){
       return data ? data.toFixed(2) + ' %' : '';
    }
}

export default FormatFilter;