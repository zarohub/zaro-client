import ZenttyClient from 'zentty-client';
import gql from 'graphql-tag';

class ZaroClient extends ZenttyClient {
    
    /**
     * params {
     *   teamID: String!
     * }
     */
    getTeamMembers (params) {
        return new Promise((fulfill, reject) => {
            this.client.query({
                fetchPolicy: 'network-only',
                query: gql`
                    query getTeamMembers($teamID: String!, $offset: Int = 0, $limit: Int = 100) {
                    	getTeamMembers(
                    	    teamID: $teamID,
                    	    offset: $offset,
                    	    limit: $limit
                    	) {
                    	    result {
                    	        total
                    	        limit
                    	        offset
                    	    }
                    	    items {
                    	        user {
                        		    _id
                        		    username
                        		    email
                        		    name
                        		    active
                        		    registered
                        		    avatarUrl
                    	        }
                    	        dateJoined
                    	        role
                    	        status
                    	    }
                    	}
                    }
                `,
                variables: {
                    ...params
                }
            }).then(result => {
                fulfill(result.data.getTeamMembers);
            }).catch(err => reject(err));
        });
    }
    
    /**
     * params {
     *  name: String!
     * }
     */
    createTeam (params) {
        return new Promise((fulfill, reject) => {
            this.client.mutate({
                mutation: gql`
                    mutation createTeam($name: String!) {
                    	createTeam(
                    	    name: $name
                    	) {
                    		team {
                    		    _id
                    		    name
                    		    subscription {
                    		        plan {
                    		            _id
                    		            name
                    		            benefits {
                    		                title
                    		                description
                    		                included
                    		            }
                    		            monthlyPrice
                    		        }
                    		        type
                    		        status
                    		    }
                    		    archived
                    		    createdAt
                    		    teamMembers {
                    		        user {
                    		            _id
                    		            username
                    		            name
                    		            active
                    		            registered
                    		            avatarUrl
                    		        }
                    		        dateJoined
                    		        role
                    		        status
                    		    }
                    		    teamMemberCount
                    		    projectCount
                    		}
                		    errors {
                		        field
                		        message
                		    }
                    	}
                    }
                `,
                variables: {
                    ...params
                }
            }).then(result => {
                if (result.data.createTeam.errors !== null) {
                    reject(result.data.createTeam.errors);
                } else {
                    fulfill(result.data.createTeam.team);
                }
            }).catch(err => reject(err));
        });
    }
    
    /**
     * params {
     *  teamID: String!
     *  userIdentifier: String!
     *  role: String!
     * }
     */
    inviteTeamMember (params) {
        return new Promise((fulfill, reject) => {
            this.client.mutate({
                mutation: gql`
                    mutation inviteTeamMember($teamID: String!, $userIdentifier: String!, $role: String!) {
                    	inviteTeamMember(
                    	    teamID: $teamID,
                    	    userIdentifier: $userIdentifier,
                    	    role: $role
                    	)
                    }
                `,
                variables: {
                    ...params
                }
            }).then(result => {
                fulfill(result.data.inviteTeamMember);
            }).catch(err => reject(err));
        });
    }
}

if (typeof window !== 'undefined') {
    window.ZaroClient = ZaroClient;
}

export default ZaroClient;