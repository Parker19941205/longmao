export class tools {
    // TAG标记
    public static cur_tag = null


    // TAG标记生成器
    public static tagGenerator(){
        if(this.cur_tag == null){
            this.cur_tag = this.getRandomNumInt(1000,9999)
        }

        this.cur_tag = this.cur_tag + 1
        return this.cur_tag
    }





    public static getRandomNumInt(min: number, max: number) {
        var Range = max - min;
        var Rand = Math.random(); //获取[0-1）的随机数
        return (min + Math.round(Rand * Range)); //放大取整
    }



    /*
    *思路：每次随机从数组抽出一个数放进新的数组，然后将这个数从原数组中剔除，这个就不会抽到重复的数了
    */
    public static  makeRandomArr(arrList,num){
        if(num>arrList.length){
         return;
        }
        // var tempArr=arrList.concat();    
        var tempArr=arrList.slice(0);
        var newArrList=[];    
        for(var i=0;i<num;i++){
            var random=Math.floor(Math.random()*(tempArr.length-1));
            var arr=tempArr[random];
            tempArr.splice(random, 1);
            newArrList.push(arr);    
        }
        return newArrList;
    }








}