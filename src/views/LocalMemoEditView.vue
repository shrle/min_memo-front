<template>
  <main class="edit">
    <div class="local-mode">ローカルモード</div>

    <article>
      <h1>{{ memoTitle }}</h1>
      <div class="">
        <button @click="end" class="text-button">編集終了</button>
      </div>
      <div v-if="errorMessage" class="warn">
        {{ errorMessage }}
      </div>

      <section class="memo-view">
        <editor
          v-model="memo"
          api-key="3hgrfaoyg1561x79u87b56n3jka8u0kf3c098n2afls30p0l"
          :inline="false"
          :init="{
            content_style: '{border:5px solid #000000;  padding: 3px;}',
            height: 800,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media  table paste code help wordcount',
            ],
            toolbar:
              'image undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          }"
          placeholder="■ここにメモを追加"
          class="editor"
        />
      </section>

      <form @submit.prevent="save" class="save-form">
        <button
          type="submit"
          class="text-button primary"
          v-bind:disabled="saving"
        >
          保存
        </button>
      </form>
    </article>
  </main>
</template>

<style>
.edit {
  background-color: #eaf5ff;
  padding-top: 20px;
  padding-bottom: 20px;
}

img {
  max-width: 100%;
}
textarea {
  border: 1px dashed red;
}

article {
  max-width: 800px;
  width: 100%;
  min-height: 100vh;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}
.memo-view {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  min-height: 80vh;
  background-color: #fff;
  border: 1px solid #aaaaaa;
}

.local-mode {
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: #b3ffb3;
  color: #000;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}

.save-form {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>

<script>
import article from "@/assets/article.json";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "LocalMemoEditView",
  components: {
    editor: Editor,
  },
  data() {
    return {
      h1List: article.category.h1,
      h2List: [],
      h3List: [],

      memo: "",
      errorMessage: "",
    };
  },
  beforeMount() {
    const p = this.$route.params;
    this.h2List = this.h1List.find((e) => e.id == p.h1Id).h2;
    this.h3List = this.h2List.find((e) => e.id == p.h2Id).h3;
  },
  computed: {
    h1Name() {
      const p = this.$route.params;
      return this.h1List.find((e) => e.id == p.h1Id).name;
    },
    h2Name() {
      const p = this.$route.params;
      return this.h2List.find((e) => e.id == p.h2Id).name;
    },
    h3Name() {
      const p = this.$route.params;
      return this.h3List.find((e) => e.id == p.h3Id).name;
    },
    memoTitle() {
      return `${this.h1Name} - ${this.h2Name} - ${this.h3Name}`;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    end() {
      const p = this.$route.params;
      this.$router.push({
        name: "local-memo",
        params: {
          h1Id: p.h1Id,
          h2Id: p.h2Id,
          h3Id: p.h3Id,
        },
      });
    },

    load() {
      const p = this.$route.params;
      const memoid = `${p.h1Id}-${p.h2Id}-${p.h3Id}`;
      const memo = localStorage.getItem(memoid);

      this.memo = memo ? memo : "";
    },
    save() {
      this.saving = true;
      const p = this.$route.params;
      const memoId = `${p.h1Id}-${p.h2Id}-${p.h3Id}`;

      localStorage.setItem(memoId, this.memo);
      alert("保存しました");
    },
    changeFile(e) {
      this.file = e.target.files[0];
    },
  },
};
</script>
