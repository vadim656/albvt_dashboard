<template>
  <div class="flex w-full flex-col gap-6">
    <b-back/>
    <div
      ref="document"
      class="py-2 px-10 w-[790px] font-['Arial'] bg-white"
      v-if="order"
    >
      <div class=" p-2 text-xs flex flex-col gap-4">
        <div class="flex justify-between">
          <span>Код заказчика: АЛЬБА-ФРИ</span>
          <span
            >Приложение № 2 <br />
            к Договору № 24-22-Р <br />
            на оказание медицинских <br />
            услуг от 18.05.2022 г.</span
          >
        </div>
        <div class="flex flex-col gap-1 items-center justify-center">
          <span>ГАРАНТИЙНОЕ ПИСЬМО</span>
          <span class=""
            >№ {{ $route.params.id }} от {{ datePismo.dateAll }}
            </span
          >
          <span
            >к Договору № 24-22-Р на оказание медицинских услуг от 18.05.2022
            г.</span
          >
        </div>
        <div class="text-justify">
          В соответствии с условиями Договора № 24-22-Р на оказание медицинских
          услуг от 18.05.2022 г. (далее – Договор) настоящим ООО МЦ «АЛЬБА ВИТА»
          (основной государственный регистрационный номер в Едином
          государственном реестре юридических лиц: 1136193006927), выступающее
          Заказчиком по Договору, просит оказать нижеуказанному физическому лицу
          (пациенту) медицинские услуги, указанные в Договоре:
        </div>
        <div class="flex flex-col gap-0">
          <div
            class="grid grid-cols-[2fr,2fr,2fr,1fr,2fr,2fr] divide-x divide-black    border border-black w-full"
          >
            <span class="p-2 flex justify-center items-center text-center"
              >Фамилия, имя, отчество пациента
            </span>
            <span class="p-2 flex justify-center items-center text-center"
              >Паспортные данные пациента (номер паспорта, кем выдан, дата
              выдачи)</span
            >
            <span class="p-2 flex justify-center items-center text-center"
              >Код медицинских услуг в соответствии с Перечнем услуг по
              Договору</span
            >
            <span class="p-2 flex justify-center items-center text-center"
              >Кол-во</span
            >
            <span class="p-2 flex justify-center items-center text-center"
              >Адрес медицинского офиса Исполнителя</span
            >
            <span class="p-2 flex justify-center items-center text-center"
              >Дата / временной интервал оказания услуг</span
            >
          </div>
          <!-- body -->
          <div
            class="grid grid-cols-[2fr,2fr,2fr,1fr,2fr,2fr] divide-x divide-black -mt-[1px]  border border-black w-full"
          >
            <span class="p-2 flex justify-start items-start text-start"
              >Эминова Ксения Сергеевна {{}}</span
            >

            <span class="p-2 flex justify-start items-start text-start"></span>
            <span class="p-2 flex justify-start items-start text-start">
              <div class="flex flex-col">
                <span
                  v-for="(item, i) in order.data.attributes.analizies.data"
                  :key="i"
                >
                  {{ item.attributes.Art }}
                </span>
              </div>
            </span>
            <span class="p-2 flex justify-start items-start text-start">
              <div class="flex flex-col">
                <span
                  v-for="(item, i) in order.data.attributes.analizies.data"
                  :key="i"
                  >1</span
                >
              </div>
            </span>
            <span class="p-2 flex justify-start items-start text-start"
              >{{
                order.data.attributes.ofisies.data[0].attributes.area_invitro
                  .data.attributes.sityes_invitros.data[0].attributes.Name
              }},
              {{ order.data.attributes.ofisies.data[0].attributes.Name }}</span
            >
            <span class="p-2 flex justify-start items-start text-start">{{
              dateOrder
            }}</span>
          </div>
        </div>
        <div class="text-justify">
          Обязуемся осуществить оплату медицинских услуг, оказанных
          вышеуказанному пациенту, в соответствии с условиями Договора.
        </div>
        <div class="text-justify">
          ____________________________________________ / С.А. Сукиасян / Тел. +7
          (863) 241-85-55 <br />
          М.п. (Должность, подпись, расшифровка подписи)
        </div>
        <div class="text-justify">
          Адрес медицинского офиса ООО «ИНВИТРО»:
          {{
            order.data.attributes.ofisies.data[0].attributes.area_invitro.data
              .attributes.sityes_invitros.data[0].attributes.Name
          }},
          {{ order.data.attributes.ofisies.data[0].attributes.Name }}
        </div>
        <div
          class="grid grid-cols-2 divide-x divide-black border border-black "
        >
          <div class="p-2 flex flex-col">
            <span class="font-bold pb-1">Исполнитель:</span>
            <div>
              Генеральный директор<br />
              ООО «Инвитро-Ростов-на-Дону»<br />
              Абдуллаев Марат Шамильевич
            </div>
            <div><br />______________________ / ______<br />м.п.</div>
          </div>
          <div class="p-2 flex flex-col">
            <span class="font-bold pb-1">Заказчик:</span>
            <div>
              Директор<br />
              ООО МЦ «АЛЬБА ВИТА»<br /><br />
            </div>
            <div><br />______________________ / С.А. Сукиасян<br />м.п.</div>
          </div>
        </div>
      </div>
    </div>
    <button @click="exportPDF" class="bg-blue-500 p-3 flex justify-center items-center rounded-md text-white hover:bg-blue-400 anime cursor-pointer max-w-[200px]">Скачать</button>
  </div>
</template>

<script>
import PISMO_ID from '~/gql/queries/PISMO_ID.gql'
import bBack from '~/components/b-back.vue'
export default {
  components: { bBack },
  middleware: 'auth',
  layout: 'main',
  apollo: {
    order: {
      query: PISMO_ID,
      variables () {
        return {
          ID: this.$route.params.id
        }
      }
    }
  },
  methods: {
    exportPDF () {
      const filename = this.$route.params.id
      this.$html2pdf(this.$refs.document, {
        margin: 1,
        filename: `pismo-${filename}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          scale: 4,
          dpi: 300,
          letterRendering: true,
          ignoreElements: true
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      })
    }
  },
  computed: {
    dateOrder () {
      var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      const date = new Date(this.order.data.attributes.createdAt)
      // const dateFinal = date.toLocaleString('en-GB').replaceAll('/', '.')
      const dateFinal = date.toLocaleString('ru', options)
      return dateFinal
    },
    datePismo () {
      let options1 = {
        day: 'numeric'
      }
      let options4 = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      const date = new Date(this.order.data.attributes.createdAt)
      const dateDay = date.toLocaleString('ru', options1)
      const dateAll = date.toLocaleString('ru', options4)
      const dataAllRTeplace = dateAll.toString().slice(3)
      return { dateDay, dateAll, dataAllRTeplace }
    }
  }
}
</script>

<style></style>
