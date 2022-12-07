<template>
  <section>
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 border-b border-gray-400">
          <tr>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-bold text-gray-600  tracking-wider"
            >
              №
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              ФИО
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Сумма
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Дата заявки
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Оплачено
            </th>

            <th
              scope="col"
              class="px-4 py-3 text-left text-sm align-top font-medium text-gray-600  tracking-wider"
            >
              Чек
            </th>
          </tr>
        </thead>
        <tbody v-if="zaprosyVrachejs !== undefined">
          <!-- Odd row -->
          <tr
            class=" border-b border-gray-400"
            :class="[item.id % 2 ? 'bg-white' : 'bg-gray-100']"
            v-for="item in zaprosyVrachejs.data"
            :key="item.id"
          >
            <td
              class="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
            >
              {{ item.id }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
              {{
                item.attributes.vrachis.data[0].attributes.FIO.replace(
                  /(\S+) (\S)\S* (\S)\S*/,
                  '$1 $2. $3.'
                )
              }}
            </td>

            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.attributes.Summ }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
              {{ item.attributes.Data }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
              <span v-if="item.attributes.oplataCheck.data.length > 0">Да</span>
              <span v-else>Нет</span>
            </td>

            <td class="px-4 py-4 whitespace-nowrap text-right">
              <a href="#" class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 "
                  :class="[
                    item.attributes.oplataCheck.data.length > 0
                      ? 'text-green-600'
                      : 'text-gray-400'
                  ]"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
                  />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'

const ALL_ZAYZVKI = gql`
  query ALL_ZAYZVKI {
    zaprosyVrachejs {
      data {
        id
        attributes {
          Data
          Done
          UID
          Summ
          oplataCheck {
            data {
              id
            }
          }
          vrachis {
            data {
              attributes {
                FIO
              }
            }
          }
        }
      }
    }
  }
`

export default {
  layout: 'main',
  apollo: {
    zaprosyVrachejs: {
      query: ALL_ZAYZVKI,
      prefetch: true,
    }
  }
}
</script>

<style></style>
