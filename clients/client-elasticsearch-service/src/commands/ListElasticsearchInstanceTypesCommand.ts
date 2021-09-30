import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  MiddlewareStack,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

import {
  ElasticsearchServiceClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../ElasticsearchServiceClient";
import { ListElasticsearchInstanceTypesRequest, ListElasticsearchInstanceTypesResponse } from "../models/models_0";
import {
  deserializeAws_restJson1ListElasticsearchInstanceTypesCommand,
  serializeAws_restJson1ListElasticsearchInstanceTypesCommand,
} from "../protocols/Aws_restJson1";

export interface ListElasticsearchInstanceTypesCommandInput extends ListElasticsearchInstanceTypesRequest {}
export interface ListElasticsearchInstanceTypesCommandOutput
  extends ListElasticsearchInstanceTypesResponse,
    __MetadataBearer {}

/**
 * <p>List all Elasticsearch instance types that are supported for given ElasticsearchVersion</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { ElasticsearchServiceClient, ListElasticsearchInstanceTypesCommand } from "@aws-sdk/client-elasticsearch-service"; // ES Modules import
 * // const { ElasticsearchServiceClient, ListElasticsearchInstanceTypesCommand } = require("@aws-sdk/client-elasticsearch-service"); // CommonJS import
 * const client = new ElasticsearchServiceClient(config);
 * const command = new ListElasticsearchInstanceTypesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListElasticsearchInstanceTypesCommandInput} for command's `input` shape.
 * @see {@link ListElasticsearchInstanceTypesCommandOutput} for command's `response` shape.
 * @see {@link ElasticsearchServiceClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListElasticsearchInstanceTypesCommand extends $Command<
  ListElasticsearchInstanceTypesCommandInput,
  ListElasticsearchInstanceTypesCommandOutput,
  ElasticsearchServiceClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListElasticsearchInstanceTypesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: ElasticsearchServiceClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListElasticsearchInstanceTypesCommandInput, ListElasticsearchInstanceTypesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "ElasticsearchServiceClient";
    const commandName = "ListElasticsearchInstanceTypesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListElasticsearchInstanceTypesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListElasticsearchInstanceTypesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(
    input: ListElasticsearchInstanceTypesCommandInput,
    context: __SerdeContext
  ): Promise<__HttpRequest> {
    return serializeAws_restJson1ListElasticsearchInstanceTypesCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListElasticsearchInstanceTypesCommandOutput> {
    return deserializeAws_restJson1ListElasticsearchInstanceTypesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}