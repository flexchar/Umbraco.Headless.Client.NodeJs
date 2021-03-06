import {Client} from "../Client";
import {Endpoint} from "../Endpoint";
import {Endpoints} from "../Endpoints";
import {CDNMediaChildrenOptions} from "../RequestOptions/index";

/**
 * Client to fetch media related objects form Umbraco headless
 */
export class MediaClient {

    constructor(
        private readonly client: Client
    ) {

    }


    private makeRequest = (endpoint: Endpoint, data?: any) => {
        return this.client.makeRequest(endpoint, data)
    }

    /**
     * Fetch root media
     */
    public root = () => {
        return this.makeRequest(Endpoints.delivery.media.root())
    }

    /**
     * Fetch media by id
     */
    public byId = (id: string|number) => {
        return this.makeRequest(Endpoints.delivery.media.byId(id))
    }

    /**
     * Fetch media children
     */
    public children = (id: string|number, options?: CDNMediaChildrenOptions) => {
        return this.makeRequest(Endpoints.delivery.media.children(id, options))
    }

}
