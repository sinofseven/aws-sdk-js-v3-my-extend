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

import { ListModelBiasJobDefinitionsRequest, ListModelBiasJobDefinitionsResponse } from "../models/models_2";
import {
  deserializeAws_json1_1ListModelBiasJobDefinitionsCommand,
  serializeAws_json1_1ListModelBiasJobDefinitionsCommand,
} from "../protocols/Aws_json1_1";
import { SageMakerClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../SageMakerClient";

export interface ListModelBiasJobDefinitionsCommandInput extends ListModelBiasJobDefinitionsRequest {}
export interface ListModelBiasJobDefinitionsCommandOutput
  extends ListModelBiasJobDefinitionsResponse,
    __MetadataBearer {}

/**
 * <p>Lists model bias jobs definitions that satisfy various filters.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { SageMakerClient, ListModelBiasJobDefinitionsCommand } from "@aws-sdk/client-sagemaker"; // ES Modules import
 * // const { SageMakerClient, ListModelBiasJobDefinitionsCommand } = require("@aws-sdk/client-sagemaker"); // CommonJS import
 * const client = new SageMakerClient(config);
 * const command = new ListModelBiasJobDefinitionsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListModelBiasJobDefinitionsCommandInput} for command's `input` shape.
 * @see {@link ListModelBiasJobDefinitionsCommandOutput} for command's `response` shape.
 * @see {@link SageMakerClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListModelBiasJobDefinitionsCommand extends $Command<
  ListModelBiasJobDefinitionsCommandInput,
  ListModelBiasJobDefinitionsCommandOutput,
  SageMakerClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListModelBiasJobDefinitionsCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: SageMakerClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListModelBiasJobDefinitionsCommandInput, ListModelBiasJobDefinitionsCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "SageMakerClient";
    const commandName = "ListModelBiasJobDefinitionsCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListModelBiasJobDefinitionsRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListModelBiasJobDefinitionsResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListModelBiasJobDefinitionsCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1ListModelBiasJobDefinitionsCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<ListModelBiasJobDefinitionsCommandOutput> {
    return deserializeAws_json1_1ListModelBiasJobDefinitionsCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}