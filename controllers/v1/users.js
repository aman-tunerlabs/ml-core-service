/**
 * name : user.js
 * author : Aman Jung Karki
 * created-date : 19-Dec-2019
 * Description : All user related information.
 */


/**
 * dependencies
 */

const usersHelper = require(MODULES_BASE_PATH + "/users/helper.js");

/**
    * User
    * @class
*/

module.exports = class Users extends Abstract {

    constructor() {
        super(schemas["users"]);
    }

    /**
     * @apiDefine errorBody
     * @apiError {String} status 4XX,5XX
     * @apiError {String} message Error
     */

    /**
     * @apiDefine successBody
     *  @apiSuccess {String} status 200
     * @apiSuccess {String} result Data
     */


    static get name() {
        return "users";
    }

    /**
     * @api {post} /kendra/api/v1/users/create 
     * create user
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/create
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Request:
     * {
      "userName": "a",
      "email": "a@a.com",
      "role": "SYS_ADMIN",
      "createdBy": "SYSTEM",
    }

    */

    /**
      * Check whether the email id provided is sys admin or not.
      * @method
      * @name create
      * @param  {Request} req request body.
      * @returns {JSON} Returns success as true or false.
     */

    create(req) {

        return new Promise(async (resolve, reject) => {

            try {

                let systemAdminDocument = 
                await usersHelper.create(req.body);

                return resolve(systemAdminDocument);

            } catch (error) {

                return reject({
                    status: 
                    error.status || 
                    httpStatusCode["internal_server_error"].status,

                    message: 
                    error.message || 
                    httpStatusCode["internal_server_error"].message
                })

            }


        })
    }

    /**
     * @api {post} /kendra/api/v1/users/isSystemAdmin 
     * check if user is system admin or not.
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/isSystemAdmin
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Request:
     * {
     * "email":"a@gmail.com" 
      }
    */

    /**
      * Check whether the email id provided is sys admin or not.
      * @method
      * @name isSystemAdmin
      * @param  {Request} req request body.
      * @returns {JSON} Returns success as true or false.
     */

    isSystemAdmin(req) {

        return new Promise(async (resolve, reject) => {

            try {

                let systemAdminDocument = 
                await usersHelper.isSystemAdmin(req.body.email);

                return resolve(systemAdminDocument);

            } catch (error) {

                return reject({
                    status: 
                    error.status || 
                    httpStatusCode["internal_server_error"].status,

                    message: 
                    error.message || 
                    httpStatusCode["internal_server_error"].message
                })

            }


        })
    }

    /**
     * @api {get} /kendra/api/v1/users/privatePrograms/:userId List of user private programs
     * @apiVersion 2.0.0
     * @apiName List of user private programs
     * @apiGroup Programs
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/privatePrograms/e97b5582-471c-4649-8401-3cc4249359bb
     * @apiParamExample {json} Response:
     * {
     "message": "List of private programs",
     "status": 200,
     "result": [
        {
            "_id": "5edf0d14c57dab7f639f3e0d",
            "externalId": "EF-DCPCR-2018-001-TEMPLATE-2020-06-09 09:46:20",
            "name": "My program",
            "description": "DCPCR Assessment Framework 2018",
            "isAPrivateProgram" : false
        }
     ]}
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
    * Private Programs .
    * @method
    * @name privatePrograms
    * @param {Object} req -request Data.
    * @param {String} req.params._id - user id
    * @returns {JSON} - List of programs created by user.
    */

    privatePrograms(req) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let programsData = 
                await usersHelper.privatePrograms(
                    (req.params._id && req.params._id != "") ? 
                    req.params._id : 
                    req.userDetails.userId
                );
                
                return resolve(programsData);
            } catch (error) {
                return reject({
                    status: error.status || httpStatusCode.internal_server_error.status,
                    message: error.message || httpStatusCode.internal_server_error.message,
                    errorObject: error
                });
            }
        });
    }

     /**
     * @api {post} /kendra/api/v1/users/createProgram/:userId?programId=:programId Users created program and solution.
     * @apiVersion 2.0.0
     * @apiName Users created program and solution.
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/createProgram/e97b5582-471c-4649-8401-3cc4249359bb?programId=5f44b08cdbe917732246149f
     * @apiParamExample {json} Request-Body:
     * {
     * "programName" : "Test project program",
     * "solutionName" : "Test project solution"
     }
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
    "status": 200,
    "result": {
        "program": {
            "resourceType": [
                "Program"
            ],
            "language": [
                "English"
            ],
            "keywords": [
                "keywords 1",
                "keywords 2"
            ],
            "concepts": [],
            "createdFor": [],
            "components": [],
            "isAPrivateProgram": true,
            "rootOrganisations": [],
            "_id": "5f44b08cdbe917732246149f",
            "deleted": false,
            "externalId": "Test project program-1598337164794",
            "name": "Test project program",
            "description": "Test project program",
            "status": "active",
            "imageCompression": {
                "quality": 10
            },
            "updatedAt": "2020-08-25T06:32:44.796Z",
            "createdAt": "2020-08-25T06:32:44.796Z",
            "__v": 0
        },
        "solution": {
            "resourceType": [],
            "language": [],
            "keywords": [],
            "concepts": [],
            "createdFor": [],
            "themes": [],
            "flattenedThemes": [],
            "entities": [],
            "registry": [],
            "isRubricDriven": false,
            "enableQuestionReadOut": false,
            "captureGpsLocationAtQuestionLevel": false,
            "isAPrivateProgram": false,
            "allowMultipleAssessemts": false,
            "isDeleted": false,
            "rootOrganisations": [],
            "_id": "5f44b08cdbe91773224614a0",
            "deleted": false,
            "name": "Test project solution",
            "externalId": "Test project solution-1598337164794",
            "description": "Test project solution",
            "programId": "5f44b08cdbe917732246149f",
            "programExternalId": "Test project program-1598337164794",
            "programName": "Test project program",
            "programDescription": "Test project program",
            "updatedAt": "2020-08-25T06:32:44.801Z",
            "createdAt": "2020-08-25T06:32:44.801Z",
            "__v": 0
        }
    }}
     */

    /**
    * Create user program and solution.
    * @method
    * @name createProgramAndSolution
    * @param {Object} req -request Data.
    * @param {String} req.params._id - user id
    * @returns {JSON} - Created user program and solution.
    */

   createProgramAndSolution(req) {
    return new Promise(async (resolve, reject) => {

        try {

            let createdProgramAndSolution = 
            await usersHelper.createProgramAndSolution(
                (req.params._id && req.params._id != "") ? 
                req.params._id : 
                req.userDetails.id,
                req.body,
                req.userDetails.userToken
            );

            return resolve(createdProgramAndSolution);

        } catch (error) {
            return reject({
                status: error.status || httpStatusCode.internal_server_error.status,
                message: error.message || httpStatusCode.internal_server_error.message,
                errorObject: error
            });
        }

    });
   }
      /**
     * @api {get} /kendra/api/v1/users/entitiesMappingForm/:stateId?roleId=:roleId 
     * Entities mapping form.
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/entitiesMappingForm/5da829874c67d63cca1bd9d0?roleId=5d6e521066a9a45df3aa891e
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     "message": "Entities mapping form fetched successfully",
     "status": 200,
     "result": [
        {
            "field": "district",
            "label": "Select District",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "text",
            "validation": {
                "required": false
            }
        },
        {
            "field": "block",
            "label": "Select Block",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "text",
            "validation": {
                "required": true
            }
        }]}
    */

    /**
      * Lists of entities mapping form
      * @method
      * @name entitiesMappingForm
      * @param  {Request} req request body.
      * @returns {JSON} List of entiites mapping form.
     */

    entitiesMappingForm(req) {

        return new Promise(async (resolve, reject) => {

            try {

                const entitiesMappingData = 
                await usersHelper.entitiesMappingForm(
                    req.params._id,
                    req.query.roleId
                );

                resolve(entitiesMappingData);

            } catch (error) {

                return reject({
                    status: 
                    error.status || 
                    httpStatusCode["internal_server_error"].status,

                    message: 
                    error.message || 
                    httpStatusCode["internal_server_error"].message
                })

            }


        })
    }


   /**
  * @api {post} /kendra/api/v1/users/solutions/:programId?page=:page&limit=:limit&search=:searchText
  * @apiVersion 1.0.0
  * @apiName User solutions
  * @apiGroup Users
  * @apiHeader {String} internal-access-token Internal access token
  * @apiHeader {String} X-authenticated-user-token Authenticity token
  * @apiSampleRequest /kendra/api/v1/users/solutions/5ff438b04698083dbfab7284?page=1&limit=10
  * @apiParamExample {json} Request-Body:
  * {
        "role" : "HM",
   		"state" : "236f5cff-c9af-4366-b0b6-253a1789766a",
        "district" : "1dcbc362-ec4c-4559-9081-e0c2864c2931",
        "school" : "c5726207-4f9f-4f45-91f1-3e9e8e84d824"
    }
  * @apiUse successBody
  * @apiUse errorBody
  * @apiParamExample {json} Response:
  * {
    "message": "Program solutions fetched successfully",
    "status": 200,
    "result": {
        "data": [
            {
                "_id": "5fc3dff14ea9b44f3340afe2",
                "type": "improvementProject",
                "externalId": "f449823a-06bb-4a3f-9d49-edbe1524ebbb-1606672337956",
                "projectTemplateId": "5ff4a46aa87a5c721f9eb664"
            },
            {
                "_id": "5ff482737f768d2de902e912",
                "externalId": "SCOPE_OBSERVATION_TEST",
                "name": "observation testing",
                "description": "Testing observation",
                "type": "observation"
            },
            {
                "_id": "5f7dc24543b6eb39bb0c6b95",
                "type": "survey",
                "name": "survey and feedback solution",
                "externalId": "d499f27c-08a0-11eb-b97f-4201ac1f0004-1602077253905",
                "description": "test survey and feedback solution"
            }
        ],
        "count": 3,
        "programName": "TEST_SCOPE_PROGRAM",
        "programId": "5ff438b04698083dbfab7284",
        "description": "View and participate in educational programs active in your location and designed for your role."
    }}
  **/

  /**
  * User targeted solutions.
  * @method
  * @name solutions
  * @param  {req}  - requested data.
  * @returns {json} List of targeted solutions.
  */

 solutions(req) {
    return new Promise(async (resolve, reject) => {
      try {

        let targetedSolutions = await usersHelper.solutions(
            req.params._id,
            req.body,
            req.pageSize,
            req.pageNo,
            req.searchText,
            req.userDetails.userToken
        );

        targetedSolutions["result"] = targetedSolutions.data;
        return resolve(targetedSolutions);

      } catch (error) {

        return reject({
            status: 
            error.status || 
            httpStatusCode["internal_server_error"].status,

            message: 
            error.message || 
            httpStatusCode["internal_server_error"].message
        })

      }
    });
  }


/**
     * @api {post} /kendra/api/v1/users/programs?page=:page&limit=:limit&search=:search 
     * Program List
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/programs?page=:page&limit=:limit&search=:search 
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Request:
     * {
        "role" : "HM",
        "state" : "236f5cff-c9af-4366-b0b6-253a1789766a",
        "district" : "1dcbc362-ec4c-4559-9081-e0c2864c2931",
        "school" : "c5726207-4f9f-4f45-91f1-3e9e8e84d824"
      }
      * @apiParamExample {json} Response:
      * {
      * "message": "Users programs fetched successfully",
        "status": 200,
        "result": {
            "data": [
                {
                    "_id": "5ff438b04698083dbfab7284",
                    "externalId": "TEST_SCOPE_PROGRAM",
                    "name": "TEST scope in program",
                    "solutions": 16
                }
            ],
            "count": 1,
            "description": "View and participate in educational programs active in your location and designed for your role"
        }
    }
    */

    /**
      * List of targeted user programs
      * @method
      * @name programs
      * @param  {Request} req request body.
      * @param {String} req.pageNo - pageNo
      * @param {String} req.pageSize - pageSize
      * @param {String} req.searchText - searchText
      * @returns {Object} list of targeted user programs. 
     */

    programs(req) {
      return new Promise(async (resolve, reject) => {

        try {
          
          let programs = 
          await usersHelper.programs( 
              req.body,
              req.pageNo,
              req.pageSize,
              req.searchText
          );

          programs.result = programs.data;
         
          return resolve(programs);

        } catch (error) {

            return reject({
                status: 
                error.status || 
                httpStatusCode["internal_server_error"].status,

                message: 
                error.message || 
                httpStatusCode["internal_server_error"].message
            })

        }

      })
    }

       /**
     * @api {get} /kendra/api/v1/users/entityTypesByLocationAndRole/:stateLocationId?role=:role
     * List of entity type by location and role.
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/entityTypesByLocationAndRole/5ca3abc3-7a0b-4d36-a090-37509903c96d?role=DEO
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
     * "message": "Entity types fetched successfully",
     * "status": 200,
     * "result": [
        "district",
        "block",
        "cluster"
    ]}
    */

    /**
      * Lists of entity types based on location and role.
      * @method
      * @name entityTypesByLocationAndRole
      * @param  {Request} req request body.
      * @returns {JSON} List of entiites mapping form.
     */

    entityTypesByLocationAndRole(req) {

        return new Promise(async (resolve, reject) => {

            try {

                const entitiesMappingData = 
                await usersHelper.entityTypesByLocationAndRole(
                    req.params._id,
                    req.query.role
                );

                entitiesMappingData["result"] = entitiesMappingData.data;
                resolve(entitiesMappingData);

            } catch (error) {

                return reject({
                    status: 
                    error.status || 
                    httpStatusCode["internal_server_error"].status,

                    message: 
                    error.message || 
                    httpStatusCode["internal_server_error"].message
                })

            }


        })
    }
    
     /**
    * @api {post} /kendra/api/v1/users/targetedEntity/:solutionId Targeted entity.
    * @apiVersion 1.0.0
    * @apiName Targeted entity.
    * @apiGroup Users
    * @apiParamExample {json} Request-Body:
    * {
        "state" : "bc75cc99-9205-463e-a722-5326857838f8",
        "district" : "b54a5c6d-98be-4313-af1c-33040b1703aa",
        "school" : "2a128c91-a5a2-4e25-aa21-3d9196ad8203",
        "role" : "DEO"
    }
    * @apiHeader {String} X-authenticated-user-token Authenticity token
    * @apiSampleRequest /kendra/api/v1/users/targetedEntity/601d41607d4c835cf8b724ad
    * @apiUse successBody
    * @apiUse errorBody
    * @apiParamExample {json} Response:
    * {
    "message": "Targeted entity fetched successfully",
    "status": 200,
    "result": {
        "_id": "5fd098e2e049735a86b748ad",
        "entityType": "district",
        "entityName": "VIZIANAGARAM"
    }}
    */

     /**
   * Targeted entity
   * @method
   * @name targetedEntity
   * @param {Object} req - requested data.
   * @param {Object} req.body - requested bidy data.
   * @returns {Array} Details entity.
   */

    async targetedEntity(req) {
        return new Promise(async (resolve, reject) => {
          try {
    
            let detailEntity = await usersHelper.targetedEntity(
                req.params._id,
                req.body
            );
    
            detailEntity["result"] = detailEntity.data;
    
            return resolve(detailEntity);
    
          } catch (error) {
            return reject({
              status: error.status || httpStatusCode.internal_server_error.status,
              message: error.message || httpStatusCode.internal_server_error.message,
              errorObject: error
            });
          }
        });
    }

        /**
     * @api {get} /kendra/api/v1/users/getUserOrganisationsAndRootOrganisations
     * Get organisation and root organisation
     * @apiVersion 1.0.0
     * @apiGroup Users
     * @apiHeader {String} X-authenticated-user-token Authenticity token
     * @apiSampleRequest /kendra/api/v1/users/getUserOrganisationsAndRootOrganisations
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Response:
     * {
    "message": "User organisations fetched successfully",
    "status": 200,
    "result": {
        "createdFor": [
            "01305447637218918413"
        ],
        "rootOrganisations": [
            "01305447637218918413"
        ]
    }
    }
    */

    /**
      * Organisations and root organisations.
      * @method
      * @name getUserOrganisationsAndRootOrganisations
      * @param  {Request} req request body.
      * @returns {JSON} Organisations and root organisations of user.
     */

    getUserOrganisationsAndRootOrganisations(req) {

        return new Promise(async (resolve, reject) => {

            try {

                const userOrganisations = 
                await usersHelper.getUserOrganisationsAndRootOrganisations(
                    (req.params._id && req.params._id != "") ? 
                    req.params._id : 
                    req.userDetails.id,
                    req.userDetails.userToken
                );

                resolve(userOrganisations);

            } catch (error) {

                return reject({
                    status: 
                    error.status || 
                    httpStatusCode["internal_server_error"].status,

                    message: 
                    error.message || 
                    httpStatusCode["internal_server_error"].message
                })

            }


        })
    }
};

