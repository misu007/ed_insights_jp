public without sharing class jpEinsteinDiscoveryController {

    @AuraEnabled
    public static Object aGetFieldValues (String fld1, String fld2, String fld3, Id recordId){
        try {
            String rObj = recordId.getSObjectType().getDescribe().getName();
            String q = 'SELECT ' + String.escapeSingleQuotes(fld1) + 
                ', ' + String.escapeSingleQuotes(fld2) + 
                ', ' + String.escapeSingleQuotes(fld3) + 
                ' FROM ' + String.escapeSingleQuotes(rObj) + 
                ' WHERE Id=\'' + String.escapeSingleQuotes(recordId) + '\' LIMIT 1';
            return database.query(q);
        } catch (Exception ex){
			return null;            
        }
    }
    
}
