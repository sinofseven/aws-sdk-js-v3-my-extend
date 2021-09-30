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

import { AlexaForBusinessClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../AlexaForBusinessClient";
import { CreateConferenceProviderRequest, CreateConferenceProviderResponse } from "../models/models_0";
import {
  deserializeAws_json1_1CreateConferenceProviderCommand,
  serializeAws_json1_1CreateConferenceProviderCommand,
} from "../protocols/Aws_json1_1";

export interface CreateConferenceProviderCommandInput extends CreateConferenceProviderRequest {}
export interface CreateConferenceProviderCommandOutput extends CreateConferenceProviderResponse, __MetadataBearer {}

/**
 * <p>Adds a new conference provider under the user's AWS account.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { AlexaForBusinessClient, CreateConferenceProviderCommand } from "@aws-sdk/client-alexa-for-business"; // ES Modules import
 * // const { AlexaForBusinessClient, CreateConferenceProviderCommand } = require("@aws-sdk/client-alexa-for-business"); // CommonJS import
 * const client = new AlexaForBusinessClient(config);
 * const command = new CreateConferenceProviderCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateConferenceProviderCommandInput} for command's `input` shape.
 * @see {@link CreateConferenceProviderCommandOutput} for command's `response` shape.
 * @see {@link AlexaForBusinessClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class CreateConferenceProviderCommand extends $Command<
  CreateConferenceProviderCommandInput,
  CreateConferenceProviderCommandOutput,
  AlexaForBusinessClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: CreateConferenceProviderCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: AlexaForBusinessClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<CreateConferenceProviderCommandInput, CreateConferenceProviderCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "AlexaForBusinessClient";
    const commandName = "CreateConferenceProviderCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: CreateConferenceProviderRequest.filterSensitiveLog,
      outputFilterSensitiveLog: CreateConferenceProviderResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: CreateConferenceProviderCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_json1_1CreateConferenceProviderCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<CreateConferenceProviderCommandOutput> {
    return deserializeAws_json1_1CreateConferenceProviderCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}