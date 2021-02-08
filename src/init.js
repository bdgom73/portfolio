if(!!window.openDatabase){
    console.log("현재 브라우저는 Web SQL Database를 지원합니다");
}else{
    console.log("현재 브라우저는 Web SQL Database를 지원하지 않습니다.")
}
const db = openDatabase("myinfo","1.0","test","5*1024*1024");

db.transaction((tx)=>{
    console.log(tx);
    tx.executeSql("CREATE TABLE member(id integer primary key, uid, password)");
    tx.executeSql("CREATE TABLE board(id integer primary key, title, content, created, updated");
})

