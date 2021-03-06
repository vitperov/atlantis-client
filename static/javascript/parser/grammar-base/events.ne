@{%
  const eventsProcessor = (d) => {
    return {
      type: "EVENTS",
      events: d[2][0].map((evt) => evt[0])
    };
  }
%}

# ------------------------------------------------------------
# FACTION EVENTS
# ------------------------------------------------------------
FACTION_EVENTS ->
  "Events during turn:"
  NL
  FACTION_EVENTS_ITEMS
  NL_ {% eventsProcessor %}


FACTION_EVENTS_ITEMS ->
  (EVENT_SENTENCE NL):+

EVENT_SENTENCE ->
  WORD
  | WORD _ _:? EVENT_SENTENCE {% array2String %}
  | WORD NL _ _:? EVENT_SENTENCE {% array2String %}