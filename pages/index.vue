<template>
  <div>
    <section>
      <button  class="p-3 border-2">Start</button>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  components: {},
  layout: 'main',
  data () {
    return {}
  },
  name: 'IndexPage',
  methods: {
    // update () {
    //   const min = 1711
    //   const max = 3321
    //   console.log('start');
    //   for (let i = 1711; i <= 3321; i++) {
    //     this.$apollo.mutate({
    //       mutation: gql`
    //         mutation($ID: ID!) {
    //           updateAnalizy(id: $ID, data: { biomaterialies: [11] }) {
    //             data {
    //               attributes {
    //                 Name
    //                 biomaterialies {
    //                   data {
    //                     id
    //                     attributes {
    //                       Name
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       `,
    //       variables: {
    //         ID: i
    //       }
    //     })
    //   }
    // }
  }
}
</script>
