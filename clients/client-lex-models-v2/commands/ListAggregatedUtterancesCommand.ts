import { LexModelsV2ClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../LexModelsV2Client";
import { ListAggregatedUtterancesRequest, ListAggregatedUtterancesResponse } from "../models/models_0";
import {
  deserializeAws_restJson1ListAggregatedUtterancesCommand,
  serializeAws_restJson1ListAggregatedUtterancesCommand,
} from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { HttpRequest as __HttpRequest, HttpResponse as __HttpResponse } from "@aws-sdk/protocol-http";
import { Command as $Command } from "@aws-sdk/smithy-client";
import {
  FinalizeHandlerArguments,
  Handler,
  HandlerExecutionContext,
  MiddlewareStack,
  HttpHandlerOptions as __HttpHandlerOptions,
  MetadataBearer as __MetadataBearer,
  SerdeContext as __SerdeContext,
} from "@aws-sdk/types";

export interface ListAggregatedUtterancesCommandInput extends ListAggregatedUtterancesRequest {}
export interface ListAggregatedUtterancesCommandOutput extends ListAggregatedUtterancesResponse, __MetadataBearer {}

/**
 * <p>Provides a list of utterances that users have sent to the
 *          bot.</p>
 *          <p>Utterances are aggregated by the text of the utterance. For example,
 *          all instances where customers used the phrase "I want to order pizza"
 *          are aggregated into the same line in the response.</p>
 *          <p>You can see both detected utterances and missed utterances. A
 *          detected utterance is where the bot properly recognized the utterance
 *          and activated the associated intent. A missed utterance was not
 *          recognized by the bot and didn't activate an intent.</p>
 *          <p>Utterances can be aggregated for a bot alias or for a bot version,
 *          but not both at the same time.</p>
 *          <p>Utterances statistics are not generated under the following
 *          conditions:</p>
 *          <ul>
 *             <li>
 *                <p>The <code>childDirected</code> field was set to true when the
 *                bot was created.</p>
 *             </li>
 *             <li>
 *                <p>You are using slot obfuscation with one or more slots.</p>
 *             </li>
 *             <li>
 *                <p>You opted out of participating in improving Amazon Lex.</p>
 *             </li>
 *          </ul>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { LexModelsV2Client, ListAggregatedUtterancesCommand } from "@aws-sdk/client-lex-models-v2"; // ES Modules import
 * // const { LexModelsV2Client, ListAggregatedUtterancesCommand } = require("@aws-sdk/client-lex-models-v2"); // CommonJS import
 * const client = new LexModelsV2Client(config);
 * const command = new ListAggregatedUtterancesCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListAggregatedUtterancesCommandInput} for command's `input` shape.
 * @see {@link ListAggregatedUtterancesCommandOutput} for command's `response` shape.
 * @see {@link LexModelsV2ClientResolvedConfig | config} for command's `input` shape.
 *
 */
export class ListAggregatedUtterancesCommand extends $Command<
  ListAggregatedUtterancesCommandInput,
  ListAggregatedUtterancesCommandOutput,
  LexModelsV2ClientResolvedConfig
> {
  // Start section: command_properties
  // End section: command_properties

  constructor(readonly input: ListAggregatedUtterancesCommandInput) {
    // Start section: command_constructor
    super();
    // End section: command_constructor
  }

  /**
   * @internal
   */
  resolveMiddleware(
    clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>,
    configuration: LexModelsV2ClientResolvedConfig,
    options?: __HttpHandlerOptions
  ): Handler<ListAggregatedUtterancesCommandInput, ListAggregatedUtterancesCommandOutput> {
    this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));

    const stack = clientStack.concat(this.middlewareStack);

    const { logger } = configuration;
    const clientName = "LexModelsV2Client";
    const commandName = "ListAggregatedUtterancesCommand";
    const handlerExecutionContext: HandlerExecutionContext = {
      logger,
      clientName,
      commandName,
      inputFilterSensitiveLog: ListAggregatedUtterancesRequest.filterSensitiveLog,
      outputFilterSensitiveLog: ListAggregatedUtterancesResponse.filterSensitiveLog,
    };
    const { requestHandler } = configuration;
    return stack.resolve(
      (request: FinalizeHandlerArguments<any>) =>
        requestHandler.handle(request.request as __HttpRequest, options || {}),
      handlerExecutionContext
    );
  }

  private serialize(input: ListAggregatedUtterancesCommandInput, context: __SerdeContext): Promise<__HttpRequest> {
    return serializeAws_restJson1ListAggregatedUtterancesCommand(input, context);
  }

  private deserialize(output: __HttpResponse, context: __SerdeContext): Promise<ListAggregatedUtterancesCommandOutput> {
    return deserializeAws_restJson1ListAggregatedUtterancesCommand(output, context);
  }

  // Start section: command_body_extra
  // End section: command_body_extra
}