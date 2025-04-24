 <script setup>
import { defineProps } from 'vue';

defineProps({
    headers: Array
})

</script>
 <template>
    <table class="table table-zebra">
        <!-- head -->
        <thead>
            <tr>
                <th v-for="header in headers"> {{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>