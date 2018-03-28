import ZenttyClient from 'zentty-client';
//import ZenttyClient from '../../../zentty/zentty-client/src/';
import gql from 'graphql-tag';

class ZaroClient extends ZenttyClient {
    
    async emailSubscriptionSignup (params) {
        const { data: { emailSubscriptionSignup: result }} = await this.client.mutate({
            mutation: gql`
                mutation emailSubscriptionSignup($name: String!, $email: String!, $interests: [EmailSubscriptionInterests]) {
                	emailSubscriptionSignup(
                	    name: $name,
                	    email: $email,
                	    interests: $interests
                	)
                }
            `,
            variables: {
                ...params
            }
        });
        
        return result;
    }
    
    async getTeamMembers (params) {
        const { data: { getTeamMembers: teamMembers }} = await this.client.query({
            fetchPolicy: 'network-only',
            query: gql`
                query getTeamMembers($companyID: String!, $offset: Int = 0, $limit: Int = 100) {
                	getTeamMembers(
                	    companyID: $companyID,
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
        });
        return teamMembers;
    }
    
    async getCompanies (params = {}) {
        const { data: { getCompanies: companies }} = await this.client.query({
            fetchPolicy: 'network-only',
            query: gql`
                query getCompanies($offset: Int = 0, $limit: Int = 100, $archived: Boolean = false) {
                	getCompanies(
                	    offset: $offset,
                	    limit: $limit,
                	    archived: $archived
                	) {
                	    result {
                	        total
                	        limit
                	        offset
                	    }
                	    items {
                            _id
                		    name
                		    subscription {
                		        plan {
                		            _id
                		            name
                		        }
                		        type
                		        status
                		    }
                		    archived
                		    createdAt
                		    getMembers(limit: 10) {
                		        result {
                		            total
                		        }
                		        items {
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
                		    }
                		    projectCount
                	    }
                	}
                }
            `,
            variables: {
                ...params
            }
        });
        
        return companies;
    }
    
    async getCompany (params) {
        const { data: { getCompany: company }} = await this.client.query({
            fetchPolicy: 'network-only',
            query: gql`
                query getCompany($id: String!) {
                	getCompany(
                        id: $id
                	) {
                        _id
            		    name
            		    subscription {
            		        plan {
            		            _id
            		            name
            		        }
            		        type
            		        status
            		    }
            		    archived
            		    createdAt
            		    getMembers(limit: 10) {
            		        result {
            		            total
            		        }
            		        items {
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
            		    }
            		    projectCount
                	}
                }
            `,
            variables: {
                ...params
            }
        });
        
        return company;
    }
    
    async createCompany (params) {
        const { data: { createCompany: company }} = await this.client.mutate({
            mutation: gql`
                mutation createCompany($name: String!) {
                	createCompany(
                	    name: $name
                	) {
                		_id
            		    name
            		    subscription {
            		        plan {
            		            _id
            		            name
            		        }
            		        type
            		        status
            		    }
            		    archived
            		    createdAt
            		    getMembers(limit: 10) {
            		        result {
            		            total
            		        }
            		        items {
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
            		    }
            		    projectCount
                	}
                }
            `,
            variables: {
                ...params
            }
        });
        
        return company;
    }
    
    async inviteTeamMember (params) {
        const { data: { inviteTeamMember: success }} = await this.client.mutate({
            mutation: gql`
                mutation inviteTeamMember($companyID: String!, $userIdentifier: String!, $role: String!) {
                	inviteTeamMember(
                	    companyID: $companyID,
                	    userIdentifier: $userIdentifier,
                	    role: $role
                	)
                }
            `,
            variables: {
                ...params
            }
        });
        
        return success;
    }
}

if (typeof window !== 'undefined') {
    window.ZaroClient = ZaroClient;
}

export default ZaroClient;