<template>
  <div id="wrapper">

    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav metismenu" id="side-menu">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">Administrador</strong>
                             </span> <span class="text-muted text-xs block">... <b class="caret"></b></span> </span> </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#">Sair</a></li>
                            </ul>
                    </div>
                    <div class="logo-element">
                        Bh+
                    </div>
                </li>
                <li class="active">
                    <router-link to="/">
                        <i class="fa fa-th-large"></i> <span class="nav-label">Visão geral</span>
                    </router-link >
                </li>
                <li>
                    <router-link to="/projetos">
                        <i class="fa fa-th-large"></i> <span class="nav-label">Projetos</span>
                    </router-link >
                </li>
            </ul>
    
        </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom">
            <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <a href="#">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>

            </nav>
        </div>
        <div>
          <router-view />
        </div>
        <div class="footer">
            <div>
                <strong>Copyright</strong> Bithome &copy; 2018
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>

</style>
