// smithy-typescript generated code
import { RuleSetObject } from "@aws-sdk/util-endpoints";

export const ruleSet: RuleSetObject = {
  version: "1.0",
  parameters: {
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "String",
    },
    UseDualStack: {
      builtIn: "AWS::UseDualStack",
      required: true,
      default: false,
      documentation:
        "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
      type: "Boolean",
    },
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "Boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "String",
    },
  },
  rules: [
    {
      conditions: [
        {
          fn: "aws.partition",
          argv: [
            {
              ref: "Region",
            },
          ],
          assign: "PartitionResult",
        },
      ],
      type: "tree",
      rules: [
        {
          conditions: [
            {
              fn: "isSet",
              argv: [
                {
                  ref: "Endpoint",
                },
              ],
            },
            {
              fn: "parseURL",
              argv: [
                {
                  ref: "Endpoint",
                },
              ],
              assign: "url",
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              error: "Invalid Configuration: FIPS and custom endpoint are not supported",
              type: "error",
            },
            {
              conditions: [],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        {
                          ref: "UseDualStack",
                        },
                        true,
                      ],
                    },
                  ],
                  error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                  type: "error",
                },
                {
                  conditions: [],
                  endpoint: {
                    url: {
                      ref: "Endpoint",
                    },
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
            },
          ],
        },
        {
          conditions: [
            {
              fn: "stringEquals",
              argv: [
                {
                  fn: "getAttr",
                  argv: [
                    {
                      ref: "PartitionResult",
                    },
                    "name",
                  ],
                },
                "aws",
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.api.aws",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route53-fips.amazonaws.com",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53.{Region}.api.aws",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "DualStack is enabled but this partition does not support DualStack",
                  type: "error",
                },
              ],
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.amazonaws.com",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "stringEquals",
              argv: [
                {
                  fn: "getAttr",
                  argv: [
                    {
                      ref: "PartitionResult",
                    },
                    "name",
                  ],
                },
                "aws-cn",
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.api.amazonwebservices.com.cn",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "cn-northwest-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.amazonaws.com.cn",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "cn-northwest-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53.{Region}.api.amazonwebservices.com.cn",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "cn-northwest-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "DualStack is enabled but this partition does not support DualStack",
                  type: "error",
                },
              ],
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.amazonaws.com.cn",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "cn-northwest-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "stringEquals",
              argv: [
                {
                  fn: "getAttr",
                  argv: [
                    {
                      ref: "PartitionResult",
                    },
                    "name",
                  ],
                },
                "aws-us-gov",
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.api.aws",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-gov-west-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route53.us-gov.amazonaws.com",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-gov-west-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
            },
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseDualStack",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsDualStack",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53.{Region}.api.aws",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-gov-west-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "DualStack is enabled but this partition does not support DualStack",
                  type: "error",
                },
              ],
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.us-gov.amazonaws.com",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-gov-west-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "stringEquals",
              argv: [
                {
                  fn: "getAttr",
                  argv: [
                    {
                      ref: "PartitionResult",
                    },
                    "name",
                  ],
                },
                "aws-iso",
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.c2s.ic.gov",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-iso-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.c2s.ic.gov",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-iso-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "stringEquals",
              argv: [
                {
                  fn: "getAttr",
                  argv: [
                    {
                      ref: "PartitionResult",
                    },
                    "name",
                  ],
                },
                "aws-iso-b",
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    {
                      ref: "UseFIPS",
                    },
                    true,
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [
                    {
                      fn: "booleanEquals",
                      argv: [
                        true,
                        {
                          fn: "getAttr",
                          argv: [
                            {
                              ref: "PartitionResult",
                            },
                            "supportsFIPS",
                          ],
                        },
                      ],
                    },
                  ],
                  type: "tree",
                  rules: [
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route-53-fips.{Region}.sc2s.sgov.gov",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-isob-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
                {
                  conditions: [],
                  error: "FIPS is enabled but this partition does not support FIPS",
                  type: "error",
                },
              ],
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.sc2s.sgov.gov",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-isob-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "booleanEquals",
              argv: [
                {
                  ref: "UseFIPS",
                },
                true,
              ],
            },
            {
              fn: "booleanEquals",
              argv: [
                {
                  ref: "UseDualStack",
                },
                true,
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    true,
                    {
                      fn: "getAttr",
                      argv: [
                        {
                          ref: "PartitionResult",
                        },
                        "supportsFIPS",
                      ],
                    },
                  ],
                },
                {
                  fn: "booleanEquals",
                  argv: [
                    true,
                    {
                      fn: "getAttr",
                      argv: [
                        {
                          ref: "PartitionResult",
                        },
                        "supportsDualStack",
                      ],
                    },
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [],
                  endpoint: {
                    url: "https://route53-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
            },
            {
              conditions: [],
              error: "FIPS and DualStack are enabled, but this partition does not support one or both",
              type: "error",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "booleanEquals",
              argv: [
                {
                  ref: "UseFIPS",
                },
                true,
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    true,
                    {
                      fn: "getAttr",
                      argv: [
                        {
                          ref: "PartitionResult",
                        },
                        "supportsFIPS",
                      ],
                    },
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [],
                  type: "tree",
                  rules: [
                    {
                      conditions: [
                        {
                          fn: "stringEquals",
                          argv: [
                            {
                              ref: "Region",
                            },
                            "aws-global",
                          ],
                        },
                      ],
                      endpoint: {
                        url: "https://route53-fips.amazonaws.com",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-east-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                    {
                      conditions: [
                        {
                          fn: "stringEquals",
                          argv: [
                            {
                              ref: "Region",
                            },
                            "aws-us-gov-global",
                          ],
                        },
                      ],
                      endpoint: {
                        url: "https://route53.us-gov.amazonaws.com",
                        properties: {
                          authSchemes: [
                            {
                              name: "sigv4",
                              signingRegion: "us-gov-west-1",
                              signingName: "route53",
                            },
                          ],
                        },
                        headers: {},
                      },
                      type: "endpoint",
                    },
                    {
                      conditions: [],
                      endpoint: {
                        url: "https://route53-fips.{Region}.{PartitionResult#dnsSuffix}",
                        properties: {},
                        headers: {},
                      },
                      type: "endpoint",
                    },
                  ],
                },
              ],
            },
            {
              conditions: [],
              error: "FIPS is enabled but this partition does not support FIPS",
              type: "error",
            },
          ],
        },
        {
          conditions: [
            {
              fn: "booleanEquals",
              argv: [
                {
                  ref: "UseDualStack",
                },
                true,
              ],
            },
          ],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "booleanEquals",
                  argv: [
                    true,
                    {
                      fn: "getAttr",
                      argv: [
                        {
                          ref: "PartitionResult",
                        },
                        "supportsDualStack",
                      ],
                    },
                  ],
                },
              ],
              type: "tree",
              rules: [
                {
                  conditions: [],
                  endpoint: {
                    url: "https://route53.{Region}.{PartitionResult#dualStackDnsSuffix}",
                    properties: {},
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
            },
            {
              conditions: [],
              error: "DualStack is enabled but this partition does not support DualStack",
              type: "error",
            },
          ],
        },
        {
          conditions: [],
          type: "tree",
          rules: [
            {
              conditions: [
                {
                  fn: "stringEquals",
                  argv: [
                    {
                      ref: "Region",
                    },
                    "aws-global",
                  ],
                },
              ],
              endpoint: {
                url: "https://route53.amazonaws.com",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
            {
              conditions: [
                {
                  fn: "stringEquals",
                  argv: [
                    {
                      ref: "Region",
                    },
                    "aws-cn-global",
                  ],
                },
              ],
              endpoint: {
                url: "https://route53.amazonaws.com.cn",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "cn-northwest-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
            {
              conditions: [
                {
                  fn: "stringEquals",
                  argv: [
                    {
                      ref: "Region",
                    },
                    "aws-us-gov-global",
                  ],
                },
              ],
              endpoint: {
                url: "https://route53.us-gov.amazonaws.com",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-gov-west-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
            {
              conditions: [
                {
                  fn: "stringEquals",
                  argv: [
                    {
                      ref: "Region",
                    },
                    "aws-iso-global",
                  ],
                },
              ],
              endpoint: {
                url: "https://route53.c2s.ic.gov",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-iso-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
            {
              conditions: [
                {
                  fn: "stringEquals",
                  argv: [
                    {
                      ref: "Region",
                    },
                    "aws-iso-b-global",
                  ],
                },
              ],
              endpoint: {
                url: "https://route53.sc2s.sgov.gov",
                properties: {
                  authSchemes: [
                    {
                      name: "sigv4",
                      signingRegion: "us-isob-east-1",
                      signingName: "route53",
                    },
                  ],
                },
                headers: {},
              },
              type: "endpoint",
            },
            {
              conditions: [],
              endpoint: {
                url: "https://route53.{Region}.{PartitionResult#dnsSuffix}",
                properties: {},
                headers: {},
              },
              type: "endpoint",
            },
          ],
        },
      ],
    },
  ],
};
