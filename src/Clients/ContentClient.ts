import {Client} from "../Client";
import {Endpoints} from "../Endpoints";
import {Endpoint} from "../Endpoint";
import {
    CDNContentAncestorsOptions, CDNContentByContentTypeOptions,
    CDNContentByIdOptions,
    CDNContentByURLOptions, CDNContentChildrenOptions, CDNContentDescendantsOptions,
    CDNContentRootOptions, CDNContentSearchOptions, CDNContentFilterOptions
} from "../RequestOptions";
import {ContentResponseElement} from "../Responses";
import {ContentFilter} from '../RequestOptions/ContentFilterOptions';

/**
 * CDNClient is used to fetch content related objects from Umbraco headless
 */
class ContentClient {
    constructor(private readonly client: Client) {

    }

    private makeRequest = <R>(endpoint: Endpoint<R>, data?: any): Promise<R> => {
        return this.client.makeRequest<R>(endpoint, data)
    }


    /**
     * Fetch root content
     * @param options Request options
     */
    public root = <T extends ContentResponseElement>(options?: CDNContentRootOptions) => {
        return this.makeRequest(Endpoints.delivery.content.root<T>(options))
    }

    /**
     * Fetch Content by id
     * @param id GUID part of an Umbraco UDI
     * @param options Request options
     */
    public byId = <T extends ContentResponseElement>(id: string|number, options?: CDNContentByIdOptions) => {
        return this.makeRequest(Endpoints.delivery.content.byId<T>(id, options))
    }

    /**
     * Fetch Content by url
     * @param url URL to search for
     * @param options Request options
     */
    public byUrl =< T extends ContentResponseElement>(url: string, options?: CDNContentByURLOptions) => {
        return this.makeRequest(Endpoints.delivery.content.byUrl<T>(url, options))
    }

    /**
     * Fetch Content children
     * @param id GUID part of an Umbraco UDI
     * @param options Request options
     */
    public children = <T extends ContentResponseElement>(id: string|number, options?: CDNContentChildrenOptions) => {
        return this.makeRequest(Endpoints.delivery.content.children<T>(id, options))
    }

    /**
     * Fetch Content ancestors
     * @param id GUID part of an Umbraco UDI
     * @param options Request options
     */
    public ancestors = (id: string|number, options?: CDNContentAncestorsOptions) => {
        return this.makeRequest(Endpoints.delivery.content.ancestors(id, options))
    }

    /**
     * Fetch Content descendants
     * @param id GUID part of an Umbraco UDI
     * @param options Request options
     */
    public descendants = (id: string|number, options?: CDNContentDescendantsOptions) => {
        return this.makeRequest(Endpoints.delivery.content.descendants(id, options))
    }

    /**
     * Fetch content with content type
     * TODO: Fix add missing types all around this call
     * @param contentType Content type needed to be displayed
     * @param options Request options
     */
    public byContentType = (contentType: string, options?: CDNContentByContentTypeOptions) => {
        return this.makeRequest(Endpoints.delivery.content.byContentType(contentType, options))
    }

    /**
     * Filter for content containing specific property values
     * TODO: Fix add missing types all around this call
     * @param contentFilter Filter
     * @param options Request options
     */
    public filter = (body: ContentFilter, options?: CDNContentFilterOptions) => {
        return this.makeRequest(Endpoints.delivery.content.filter(options), body)
    }

    /**
     * Search for content containing term
     * TODO: Fix add missing types all around this call
     * @param term Term to search for
     * @param options Request options
     */
    public search = (term: string, options?: CDNContentSearchOptions) => {
        return this.makeRequest(Endpoints.delivery.content.search(term, options))
    }

}

export {ContentClient}
