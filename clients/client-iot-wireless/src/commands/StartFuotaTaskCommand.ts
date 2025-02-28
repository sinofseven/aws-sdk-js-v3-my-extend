// smithy-typescript generated code
import { EndpointParameterInstructions, getEndpointPlugin } from "@aws-sdk/middleware-endpoint";
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

import { IoTWirelessClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IoTWirelessClient";
import {
  StartFuotaTaskRequest,
  StartFuotaTaskRequestFilterSensitiveLog,
  StartFuotaTaskResponse,
  StartFuotaTaskResponseFilterSensitiveLog,
} from "../models/models_0";
import {
  deserializeAws_restJson1StartFuotaTaskCommand,
  serializeAws_restJson1StartFuotaTaskCommand,
} from "../protocols/Aws_restJson1";

export interface StartFuotaTaskCommandInput extends StartFuotaTaskRequest {}
export interface StartFuotaTaskCommandOutput extends StartFuotaTaskResponse, __MetadataBearer {}

/**
 * <p>Starts a FUOTA task.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IoTWirelessClient, StartFuotaTaskCommand } from "@aws-sdk/client-iot-wireless"; // ES Modules import
 * // const { IoTWirelessClient, StartFuotaTaskCommand } = require("@aws-sdk/client-iot-wireless"); // CommonJS import
 * const client = new IoTWirelessClient(config);
 * const command = new StartFuotaTaskCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link StartFuotaTaskCommandInput} for command's `input` shape.
 * @see {@link StartFuotaTaskCommandOutput} for command's `response` shape.
 * @see {@link IoTWirelessClientResolvedConfig | config} for IoTWirelessClient's `config` shape.
 *
 */
export class StartFuotaTaskCommand extends $Command<
  StartFuotaTaskCommandInput,
  StartFuotaTaskCommandOutput,
  IoTWirelessClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  public static getEndpointParameterInstructions(): EndpointParameterInstructions {
    return {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
    };
  }

  constructor(readonly input: StartFuotaTaskCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: IoTWirelessClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<StartFuotaTaskCommandInput, StartFuotaTaskCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, StartFuotaTaskCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "IoTWirelessClient";
    const commandName = "StartFuotaTaskCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: StartFuotaTaskRequestFilterSensitiveLog,
      outputFilterSensitiveLog: StartFuotaTaskResponseFilterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: StartFuotaTaskCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1StartFuotaTaskCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<StartFuotaTaskCommandOutput> {
    return deserializeAws_restJson1StartFuotaTaskCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
