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

import { LocationClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../LocationClient";
import {
  DisassociateTrackerConsumerRequest,
  DisassociateTrackerConsumerRequestFilterSensitiveLog,
  DisassociateTrackerConsumerResponse,
  DisassociateTrackerConsumerResponseFilterSensitiveLog,
} from "../models/models_0";
import {
  deserializeAws_restJson1DisassociateTrackerConsumerCommand,
  serializeAws_restJson1DisassociateTrackerConsumerCommand,
} from "../protocols/Aws_restJson1";

export interface DisassociateTrackerConsumerCommandInput extends DisassociateTrackerConsumerRequest {}
export interface DisassociateTrackerConsumerCommandOutput
  extends DisassociateTrackerConsumerResponse,
    __MetadataBearer {}

/**
 * <p>Removes the association between a tracker resource and a geofence collection.</p>
 *         <note>
 *             <p>Once you unlink a tracker resource from a geofence collection, the tracker
 *                 positions will no longer be automatically evaluated against geofences.</p>
 *         </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { LocationClient, DisassociateTrackerConsumerCommand } from "@aws-sdk/client-location"; // ES Modules import
 * // const { LocationClient, DisassociateTrackerConsumerCommand } = require("@aws-sdk/client-location"); // CommonJS import
 * const client = new LocationClient(config);
 * const command = new DisassociateTrackerConsumerCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DisassociateTrackerConsumerCommandInput} for command's `input` shape.
 * @see {@link DisassociateTrackerConsumerCommandOutput} for command's `response` shape.
 * @see {@link LocationClientResolvedConfig | config} for LocationClient's `config` shape.
 *
 */
export class DisassociateTrackerConsumerCommand extends $Command<
  DisassociateTrackerConsumerCommandInput,
  DisassociateTrackerConsumerCommandOutput,
  LocationClientResolvedConfig
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

  constructor(readonly input: DisassociateTrackerConsumerCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: LocationClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<DisassociateTrackerConsumerCommandInput, DisassociateTrackerConsumerCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
    this.middlewareStack.use(
      getEndpointPlugin(configuration, DisassociateTrackerConsumerCommand.getEndpointParameterInstructions())
    );

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "LocationClient";
    const commandName = "DisassociateTrackerConsumerCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: DisassociateTrackerConsumerRequestFilterSensitiveLog,
      outputFilterSensitiveLog: DisassociateTrackerConsumerResponseFilterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: DisassociateTrackerConsumerCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1DisassociateTrackerConsumerCommand(input, context);
  }

  private deserialize(
    output: __HttpResponse,
    context: __SerdeContext
  ): Promise<DisassociateTrackerConsumerCommandOutput> {
    return deserializeAws_restJson1DisassociateTrackerConsumerCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}
