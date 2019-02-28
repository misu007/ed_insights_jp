@isTest
public class jpEinsteinDiscoveryControllerTest {
    private static testMethod void myTest() {
        User me = [SELECT Id FROM User LIMIT 1];
     	jpEinsteinDiscoveryController.aGetFieldValues(
        	'Id', 'FirstName', 'LastName', me.Id
        ); 
        jpEinsteinDiscoveryController.aGetFieldValues(
        	'Idd', 'FirstName', 'LastName', me.Id
        );
    }    
}