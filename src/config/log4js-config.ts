export const LOG4JS = {
                            appenders: { console: { type: "console" },
                                        dateFile:
                                          { type: "dateFile",
                                          filename: "logs/app.log",
                                          pattern: "yyyy-MM-dd",
                                          numBackups: 15,
                                          compress: true },
                                        errorFile:
                                            { type: "file",
                                              filename: "logs/app-error.log",
                                              maxLogSize: 10485760,
                                              encoding: "utf-8",
                                              mode: "000640",
                                              flags: "w+",
                                              numBackups: 5,
                                              compress: true },
                                       },
                            categories: { default: { appenders: ["console", "dateFile" ], level: "debug" } },
                          };

export const LOG4JS_TEST = {
                              appenders: { console: { type: "console" },
                                           File: { type: "file",
                                           filename: "logs/test.log",
                                           maxLogSize: 10240,
                                           numBackups: 15,
                                           compress: true },
                            },
                            categories: { default: { appenders: ["console", "File"], level: "info" }},

};
