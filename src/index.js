//import ZenttyClient from 'zentty-client';
import ZenttyClient from '../../../zentty/zentty-client/src';
import gql from 'graphql-tag';

class ZaroClient extends ZenttyClient {
    
    async getTeamMembers (params) {
        const { data: { getTeamMembers: teamMembers }} = await this.client.query({
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
    
    async getTeams (params = {}) {
        const { data: { getTeams: teams }} = await this.client.query({
            fetchPolicy: 'network-only',
            query: gql`
                query getTeams($offset: Int = 0, $limit: Int = 100, $archived: Boolean = false) {
                	getTeams(
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
        
        return teams;
    }
    
    async getTeam (params) {
        const { data: { getTeam: team }} = await this.client.query({
            fetchPolicy: 'network-only',
            query: gql`
                query getTeam($id: String!) {
                	getTeam(
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
        
        return team;
    }
    
    async createTeam (params) {
        const { data: { createTeam: team }} = await this.client.mutate({
            mutation: gql`
                mutation createTeam($name: String!) {
                	createTeam(
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
        
        return team;
    }
    
    async inviteTeamMember (params) {
        const { data: { inviteTeamMember: success }} = await this.client.mutate({
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
        });
        
        return success;
    }
}

if (typeof window !== 'undefined') {
    window.ZaroClient = ZaroClient;
}

export default ZaroClient;