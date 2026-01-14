<script>
  let isOpen = false;
  import Icon from "@iconify/svelte";
</script>

<header>
    <div class="flex justify-between items-center p-2">
        <div class="p-2">Katia Campagne</div>
        <nav>
          <ul class="flex gap-1">
              <li class="p-2 hover:text-accent1 hover:underline">
                  <a href="">Accueil</a>
              </li>
              <li class="p-2 hover:text-accent1 hover:underline">
                  <a href="">Livres</a>
              </li>
              <li class="p-2 hover:text-accent1 hover:underline">
                  <a href="">Chroniques</a>
              </li>
              <li class="p-2 hover:text-accent1 hover:underline">
                  <a href="">A propos</a>
              </li>
              <li class="p-2 hover:text-accent1 hover:underline">
                  <a href="">Contact</a>
              </li>
              <li class="p-2 hover:text-accent1 hover:underline">
                  <Icon icon="ri:moon-fill" class="text-xl" />
              </li>   
          </ul>
        </nav>
        <button class="bg-accent1 text-white px-4 rounded-3xl cursor-pointer hover:bg-bg-main hover:text-accent1 ">Newsletter</button>
    </div>
</header>
