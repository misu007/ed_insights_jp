({
	doInit : function(cmp, evt, helper) {
        
        // 値の初期値セット
        helper.initValues(cmp);
        
        try{            
            // APEXからレコード項目値の取得
            helper.getRecord(cmp, function(res){            
                
                // 予測値の処理
                const field1 = cmp.get('v.field1');
                const prediction = res[field1];
                const predictionColor = helper.getColor(cmp, prediction);
                cmp.set('v.output1', {
                    value: prediction, color: predictionColor
                });            
                
                // 主な要因の処理
                const field2 = cmp.get('v.field2');
                const causeObjects = helper.stringToObjects(res[field2]);
                const causeObjectsWithColor = helper.addColor(cmp, causeObjects);
                const causes = helper.localize(causeObjectsWithColor);
                cmp.set('v.output2', causes);       
                
                // リコメンドの処理
                const field3 = cmp.get('v.field3');
                const recommendObjects = helper.stringToObjects(res[field3]);
                const recommendObjectsWithColor = helper.addColor(cmp, recommendObjects);
                const recommends = helper.localize(recommendObjectsWithColor);
                cmp.set('v.output3', recommends);
                
            });
        } catch(ex){
            console.log(ex);
        }
        
    }
})