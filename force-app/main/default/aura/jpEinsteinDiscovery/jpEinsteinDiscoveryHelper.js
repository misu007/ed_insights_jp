({
    // Object[]: 英語 => 日本語に変換
    localize : function(objs){
        return objs.map(function(obj){
            const enText = obj.enText;
            const jpText = enText
            .replace(/^from\sthe\sbaseline$/, '基準値から')
            .replace(/^if\syou\schange\s(.+)\sto\s(.+)$/, '<b>$1</b> が <b>$2</b> になれば')
            .replace(/^because\sof\sother\sfactors$/, 'その他の要因')
            .replace(/\s(\S+)\sis\s(\S+)\sand/g, ' <b>$1</b> が <b>$2</b> かつ、')
            .replace(/\s(\S+)\sis\s(\S+)$/, ' <b>$1</b> が <b>$2</b> のため')
            .replace(/^because\s/, '');
            return Object.assign(obj, {jpText: jpText});               
        });
    },
    
    // String => Object[]
    stringToObjects : function(str){
        const vals = str.split(/\n/);
        return vals.map(function(val){
            const mt1 = val.match(/^([+-]\s?[0-9.]+\s)(?:Percentage\s)?(.+)/);
            const mt2 = val.match(/^(.+)(?:\,\s)([+-]\s?[0-9.]+)(?:\sPercentage)?/);
            if (mt1){
                return {
                    value: mt1[1],
                    enText: mt1[2]
                };
            } else if (mt2){
                return {
                    value: mt2[2],
                    enText: mt2[1]
                };
            }
            return {
                value: '',
                enText: val
            };
        });
    },
    
    // Object[]: 色情報(success=緑, error=赤)を付加
    addColor : function(cmp, objs){
        const reverseColor = cmp.get('v.reverseColor');
        return objs.map(function(obj){
            let color = 'weak';
            if (obj.value && obj.value.length > 0){
                const val = Number(obj.value.replace(/\s/g, ''));
                const isBig = val > 0 ? !reverseColor: !!reverseColor;
                color = isBig ? 'success': 'error';
            }
            return Object.assign(obj, {color: color});
        });
    },
    
    // 予測値から色情報(success=緑, error=赤)を判定
    getColor : function(cmp, val){
        let color = 'weak';
        if (val){
            const baseValue = Number(cmp.get('v.baseValue'));
            const reverseColor = cmp.get('v.reverseColor');
            const isBig = val && val > baseValue ? !reverseColor: !!reverseColor;
            color = isBig ? 'success': 'error';  
        }
        return color;
    },
    
    initValues: function(cmp){
        cmp.set('v.output1', {
            value: '---', color: 'weak'
        });
        cmp.set('v.output2', []);
        cmp.set('v.output3', []);
    },
    getRecord : function(cmp, callback) {
		const action = cmp.get('c.aGetFieldValues');
        action.setParams({
            fld1 : cmp.get('v.field1'),
            fld2 : cmp.get('v.field2'),
            fld3 : cmp.get('v.field3'),
            recordId : cmp.get('v.recordId')
        });
        action.setCallback(this, function(response){
            const state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") {
                if (callback){
                    const obj = response.getReturnValue();
                    if (obj && obj.length == 1){
                        callback(obj[0]);
                    }
                }
            }
        });
        $A.enqueueAction(action);
	}    
})