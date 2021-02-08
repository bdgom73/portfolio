if(!!window.openDatabase){
    console.log("현재 브라우저는 Web SQL Database를 지원합니다");
}else{
    console.log("현재 브라우저는 Web SQL Database를 지원하지 않습니다.")
}
const db = openDatabase("introduce","1.0","My Introduce","2*1024*1024");


export function createTable(sql) {
    db.transaction((tx)=>{
        tx.executeSql(sql);
    })
} 

export function insertData(sql,arg,setState) {
    db.transaction((tx)=>{
        tx.executeSql(sql,arg,(tx,result)=>{
            setState(`${new Date()} / 암호가 동일합니다.`);
            setState(`${new Date()} / 저장에 성공했습니다.`);
        },(e)=>{
            setState(`${new Date()} / 저장에 실패했습니다. ` + e.toString());
        });
    })
}  
export function insertSql(sql,arg,cb) {
    db.transaction((tx)=>{
        tx.executeSql(sql,arg,(tx,result)=>{
            if(cb) cb(result.insertId)
        });
    })
} 
export function lastSqlId(cb) {
    db.transaction((tx)=>{
        tx.executeSql("select LAST_INSERT_ID()",[],(tx,result)=>{
            console.log("안됨?")
            if(cb) cb(result);
        },(tx,result)=>{
            console.log(" 에러임?"+tx,result);
        });
    })
}
export async function findAll(tableName,cb) {
    await db.transaction( (tx)=>{
        tx.executeSql(`select * from ${tableName}`,
        [],(tx,result)=>{
            var row = []
            for(var i = 0; i < result.rows.length; i++){
                row.push(result.rows.item(i));                                             
            }   
            cb(row);     
        });
    })   
}
export async function findJoinAll(tableName,cb) {
    await db.transaction( (tx)=>{
        tx.executeSql(
            `select 
            board.id,board.title,board.content,
            board.created,board.updated,board.write,board.member_id,
            member.uid
            from ${tableName} LEFT OUTER JOIN member on board.member_id= member.id ORDER BY board.id desc`,
            []
            ,(tx,result)=>{
                var row = []
                for(var i = 0; i < result.rows.length; i++){
                    row.push(result.rows.item(i));                                         
                }   
                cb(row);     
        });
    })   
}

export function findById(tableName,id,cb) {
    db.transaction((tx)=>{
        tx.executeSql(` 
        select board.id,board.title,board.content,
        board.created,board.updated,board.write,board.member_id,
        member.uid
        from ${tableName} LEFT OUTER JOIN member on board.member_id= member.id  
        where board.id= ? ORDER BY board.id `,
        [id],function(tx,result){
            console.log(result);
            const value = result.rows[0];
            cb(value);
        });
    }) ;
}
export function findMemberById(userId, cb) {
     db.transaction((tx)=>{
        tx.executeSql(`select * from member where id = ?`,
        [userId],function(tx,result){
            const value = result.rows[0];
            cb(value);
        });
    });
    
}
export function findByUserId(tableName, userId, cb) {
    let value;
     db.transaction((tx)=>{
        tx.executeSql(`select * from ${tableName} where uid = ?`,
        [userId],function(tx,result){
            value = result.rows[0];
            cb(value);
        });
    });
    
}
export function find({
    tableName,
    terms,
    termsValue,
    sql,
    arg
},setState) {
    let staticSQL = `select * from ${tableName} where ${terms} = ?`;
    let staticArg = [termsValue];
    
    if(tableName && !terms && !termsValue && !sql && !arg){
        staticSQL = `select * from ${tableName}`;
        staticArg = [];
    }else if(tableName && termsValue && terms && !sql && !arg){
        staticSQL = `select * from ${tableName} where ${terms} = ?`;
        staticArg = [termsValue];
    }else if(sql && !arg){
        staticSQL = sql;
        staticArg = [];
    }else if(sql && arg){
        staticSQL = sql;
        staticArg = arg;
    }else{
        throw new Error("The factor value is invalid.");
    }
    let value = []
    db.transaction((tx)=>{
        tx.executeSql(staticSQL,
        staticArg,function(tx,result){
            for(var i = 0 ; i < result.rows.length ; i++){
                value.push(result.rows[i]);
            }
            setState(value);
        });
    }) ;
}

export function updateBoardById(updateData,cb) { 
    console.log(updateData);
    db.transaction((tx)=>{
        tx.executeSql(`
        UPDATE board 
        SET title=?, content =? ,updated = ? where board.id = ? `,
        [updateData.title,updateData.content,updateData.updated,updateData.id],
        function(tx,result){
            if(cb) cb();
        });
    });
}
export function deleteBoardById(borderId,cb) { 
    db.transaction((tx)=>{
        tx.executeSql(`
        DELETE FROM board where board.id = ? `,
        [borderId],
        function(tx,result){
            if(cb) cb();
        });
    });
}
