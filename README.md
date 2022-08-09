# Rover dirty check reproduction

## Issue

When checking against already published Federation 2 schema is lists list of types to be added.

```
Checking the proposed schema for subgraph program against demo@current
Check Result:

Compared 8 schema changes against 1 operations
┌────────┬─────────────────────┬────────────────────────────────────────────────────┐
│ Change │        Code         │                    Description                     │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED          │ type `join__FieldSet`: created                     │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED          │ type `join__Graph`: created                        │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ VALUE_ADDED_TO_ENUM │ enum type `join__Graph`: value `PROGRAM` added     │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ VALUE_ADDED_TO_ENUM │ enum type `join__Graph`: value `SERVER` added      │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED          │ type `link__Import`: created                       │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ TYPE_ADDED          │ type `link__Purpose`: created                      │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ VALUE_ADDED_TO_ENUM │ enum type `link__Purpose`: value `SECURITY` added  │
├────────┼─────────────────────┼────────────────────────────────────────────────────┤
│ PASS   │ VALUE_ADDED_TO_ENUM │ enum type `link__Purpose`: value `EXECUTION` added │
└────────┴─────────────────────┴────────────────────────────────────────────────────┘
View full details at https://studio.apollographql.com/graph/...
```

## Steps used to test the issue

1. Installed rover and apollo `npm i -E @apollo/rover @apollo/subgraph apollo-server graphql`
2. Copied [example](https://www.apollographql.com/docs/federation/v1/subgraphs#combined-example) from documentation to `server.js`
3. Introspected schema with `rover subgraph introspect http://localhost:4001 > schema.graphql`
4. Created new supergraph to Apollo Studio and copied `APOLLO_KEY` and new graph ref
5. Executed `APOLLO_KEY=service:testing-... yarn run publish $GRAPH_REF@current` to publish the subgraph
6. Executed `APOLLO_KEY=service:testing-... yarn run check $GRAPH_REF@current` to validate same schema with the published one
7. Expected to see no changes, but got list of added types mentioned in the issue description
