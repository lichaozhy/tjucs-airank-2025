/* eslint-disable @typescript-eslint/no-empty-object-type */
export namespace Blog {
	export namespace Article {
		export namespace Instance {
			export interface Data {
				title: string;
				code: string;
				abstract: string;
				by: string;
				at: string;
			}

			export interface Node {
				$data: Data;
			}
		}

		export interface Node {
			[id: string]: Instance.Node;
		}
	}

	export namespace Cover {
		export interface Data {

		}

		export interface Node {
			$data: Data;
		}
	}

	export interface Node {
		cover: Cover.Node;
		article: Article.Node;
	}
}
