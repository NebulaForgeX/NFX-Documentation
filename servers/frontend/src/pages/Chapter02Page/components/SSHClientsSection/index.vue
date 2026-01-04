<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.sshClients.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.sshClients.cursor.title') }}</h3>
      <p>{{ $t('chapter02.sshClients.cursor.description') }}</p>
      <p v-html="$t('chapter02.sshClients.cursor.requirements')"></p>
      <ul>
        <li v-for="(req, index) in $tm('chapter02.sshClients.cursor.reqItems')" :key="index">
          {{ req }}
        </li>
      </ul>
      <p v-html="$t('chapter02.sshClients.cursor.advantages')"></p>
      <ul>
        <li v-for="(adv, index) in $tm('chapter02.sshClients.cursor.advItems')" :key="index">
          {{ adv }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.sshClients.vscode.title') }}</h3>
      <p>{{ $t('chapter02.sshClients.vscode.description') }}</p>
      <p v-html="$t('chapter02.sshClients.vscode.requirements')"></p>
      <ul>
        <li v-for="(req, index) in $tm('chapter02.sshClients.vscode.reqItems')" :key="index">
          {{ req }}
        </li>
      </ul>
      <p v-html="$t('chapter02.sshClients.vscode.notes')"></p>
      <ul>
        <li v-for="(note, index) in $tm('chapter02.sshClients.vscode.noteItems')" :key="index">
          {{ note }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.sshClients.others.title') }}</h3>
      <p>{{ $t('chapter02.sshClients.others.description') }}</p>
      <ul>
        <li v-for="(item, index) in $tm('chapter02.sshClients.others.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

